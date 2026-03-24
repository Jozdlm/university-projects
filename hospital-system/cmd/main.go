package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/jozdlm/hospital-system/internal/auth"
	"github.com/jozdlm/hospital-system/internal/clinic"
	"github.com/jozdlm/hospital-system/internal/db"
	"github.com/jozdlm/hospital-system/internal/queue"
	"github.com/jozdlm/hospital-system/internal/reports"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	db.Connect()

	// Auto migrate
	db.DB.AutoMigrate(
		&db.User{},
		&db.Clinic{},
		&db.Patient{},
		&db.Ticket{},
		&db.QueueEntry{},
	)

	// Set up Gin router
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Health check route
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Hospital system is running!",
		})
	})

	// Auth routes (public)
	r.POST("/api/auth/login", auth.Login)

	// Protected routes
	protected := r.Group("/api")
	protected.Use(auth.JWTMiddleware())
	{
		protected.GET("/me", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"user_id": c.MustGet("user_id"),
				"role":    c.MustGet("role"),
			})
		})
		protected.POST("/tickets/emit", queue.EmitTicket)
		protected.GET("/queue/:clinicId", queue.GetQueue)
		protected.PUT("/queue/:clinicId/call-next", queue.CallNext)
		protected.PUT("/tickets/:ticketId/attend", queue.MarkAttended)
		protected.GET("/reports/by-clinic", reports.GetTicketsByClinic)
		protected.GET("/reports/by-status", reports.GetTicketsByStatus)
		protected.GET("/clinics", clinic.GetClinics)
	}

	// Start server on port 8080
	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
