package ticket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
	"github.com/jozdlm/hospital-system/internal/network"
)

func GetTickets(ctx *gin.Context) {
	var tickets []db.Ticket
	db.DB.Find(&tickets)
	network.Success(ctx, http.StatusOK, gin.H{"tickets": tickets})
}
