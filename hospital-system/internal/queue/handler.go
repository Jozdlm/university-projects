package queue

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
	"github.com/jozdlm/hospital-system/internal/utils"
)

func EmitTicket(c *gin.Context) {
	var input struct {
		ClinicID    uint   `json:"clinic_id" binding:"required,min=1"`
		PatientName string `json:"patient_name" binding:"required,min=2,max=100"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.HandleValidationError(c, err)
		return
	}

	// Verify clinic exists
	var clinic db.Clinic
	if err := db.DB.First(&clinic, input.ClinicID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clinic not found"})
		return
	}

	// Create patient
	patient := db.Patient{Name: input.PatientName}
	db.DB.Create(&patient)

	// Generate ticket code e.g. MG-014
	var count int64
	db.DB.Model(&db.Ticket{}).Where("clinic_id = ?", input.ClinicID).Count(&count)
	code := fmt.Sprintf("%s-%03d", clinic.Name[:2], count+1)

	// Create ticket
	ticket := db.Ticket{
		Code:      code,
		Status:    "WAITING",
		ClinicID:  input.ClinicID,
		PatientID: patient.ID,
	}
	db.DB.Create(&ticket)

	// Get current max position in queue
	var maxPosition int64
	db.DB.Model(&db.QueueEntry{}).Where("clinic_id = ?", input.ClinicID).Count(&maxPosition)

	// Add to queue
	entry := db.QueueEntry{
		TicketID: ticket.ID,
		ClinicID: input.ClinicID,
		Position: int(maxPosition) + 1,
	}
	db.DB.Create(&entry)

	c.JSON(http.StatusCreated, gin.H{
		"ticket":   ticket,
		"position": entry.Position,
	})
}

func GetQueue(c *gin.Context) {
	clinicID := c.Param("clinicId")

	var entries []db.QueueEntry
	db.DB.Where("clinic_id = ?", clinicID).
		Preload("Ticket").
		Preload("Ticket.Patient").
		Order("position asc").
		Find(&entries)

	c.JSON(http.StatusOK, gin.H{"queue": entries})
}

func CallNext(c *gin.Context) {
	clinicID := c.Param("clinicId")

	// Get all waiting entries for this clinic ordered by position
	var entries []db.QueueEntry
	db.DB.Where("clinic_id = ?", clinicID).
		Preload("Ticket").
		Preload("Ticket.Patient").
		Order("position asc").
		Find(&entries)

	// Find the first one with WAITING status
	var entry db.QueueEntry
	found := false
	for _, e := range entries {
		if e.Ticket.Status == "WAITING" {
			entry = e
			found = true
			break
		}
	}

	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "No waiting tickets in this queue"})
		return
	}

	// Update ticket status
	db.DB.Model(&entry.Ticket).Update("status", "IN_ATTENTION")

	// Remove from queue
	db.DB.Where("ticket_id = ?", entry.TicketID).Delete(&db.QueueEntry{})

	// Recalculate positions for remaining WAITING tickets
	recalculateTicketPosition(clinicID)

	c.JSON(http.StatusOK, gin.H{"ticket": entry.Ticket})
}

func MarkAttended(c *gin.Context) {
	ticketID := c.Param("ticketId")

	var ticket db.Ticket
	if err := db.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
		return
	}

	db.DB.Model(&ticket).Update("status", "ATTENDED")

	c.JSON(http.StatusOK, gin.H{"ticket": ticket})
}

func CancelTicket(c *gin.Context) {
	ticketID := c.Param("ticketId")

	var ticket db.Ticket
	if err := db.DB.First(&ticket, ticketID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found"})
		return
	}

	if ticket.Status != "WAITING" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Only waiting tickets can be cancelled",
		})
		return
	}

	db.DB.Model(&ticket).Update("status", "CANCELLED")

	// Remove from queue
	db.DB.Where("ticket_id = ?", ticket.ID).Delete(&db.QueueEntry{})

	// Recalculate positions for remaining WAITING tickets
	recalculateTicketPosition(fmt.Sprint(ticket.ClinicID))

	c.JSON(http.StatusOK, gin.H{
		"message": "Ticket cancelled successfully",
		"ticket":  ticket,
	})
}
