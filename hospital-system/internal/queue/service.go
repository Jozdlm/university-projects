package queue

import "github.com/jozdlm/hospital-system/internal/db"

func recalculateTicketPosition(clinicID string) {
	var remainingEntries []db.QueueEntry
	db.DB.Where("clinic_id = ?", clinicID).
		Preload("Ticket").
		Order("position asc").
		Find(&remainingEntries)

	for i, e := range remainingEntries {
		if e.Ticket.Status == "WAITING" {
			db.DB.Model(&e).Update("position", i+1)
		}
	}
}
