package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/jozdlm/hospital-system/internal/auth"
	"github.com/jozdlm/hospital-system/internal/db"
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
	}

	// Start server on port 8080
	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
