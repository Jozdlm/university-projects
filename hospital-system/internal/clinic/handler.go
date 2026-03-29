package clinic

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
	"github.com/jozdlm/hospital-system/internal/network"
)

func GetClinics(ctx *gin.Context) {
	var clinics []db.Clinic
	db.DB.Find(&clinics)
	network.Success(ctx, http.StatusOK, gin.H{"clinics": clinics})
}
