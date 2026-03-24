package reports

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
)

type TicketsByClinic struct {
	ClinicName string `json:"clinic_name"`
	Total      int64  `json:"total"`
}

type TicketsByStatus struct {
	Status string `json:"status"`
	Total  int64  `json:"total"`
}

func GetTicketsByClinic(c *gin.Context) {
	var results []TicketsByClinic

	db.DB.Model(&db.Ticket{}).
		Select("clinics.name as clinic_name, count(*) as total").
		Joins("JOIN clinics ON clinics.id = tickets.clinic_id").
		Where("tickets.status = ?", "ATTENDED").
		Group("clinics.id, clinics.name").
		Scan(&results)

	c.JSON(http.StatusOK, gin.H{"report": results})
}

func GetTicketsByStatus(c *gin.Context) {
	var results []TicketsByStatus

	db.DB.Model(&db.Ticket{}).
		Select("status, count(*) as total").
		Group("status").
		Scan(&results)

	c.JSON(http.StatusOK, gin.H{"report": results})
}
