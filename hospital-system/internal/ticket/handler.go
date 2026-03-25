package ticket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
)

func GetTickets(c *gin.Context) {
	var tickets []db.Ticket
	db.DB.Find(&tickets)
	c.JSON(http.StatusOK, gin.H{"tickets": tickets})
}
