package clinic

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jozdlm/hospital-system/internal/db"
)

func GetClinics(c *gin.Context) {
	var clinics []db.Clinic

	db.DB.Find(&clinics)

	c.JSON(http.StatusOK, gin.H{"clinics": clinics})
}
