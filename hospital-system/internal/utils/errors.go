package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func HandleValidationError(c *gin.Context, err error) {
	var errors []gin.H

	for _, e := range err.(validator.ValidationErrors) {
		errors = append(errors, gin.H{
			"field":   e.Field(),
			"message": validationMessage(e),
		})
	}

	c.JSON(http.StatusBadRequest, gin.H{"errors": errors})
}

func validationMessage(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return e.Field() + " is required"
	case "email":
		return "Invalid email format"
	case "min":
		return e.Field() + " must be at least " + e.Param() + " characters"
	case "max":
		return e.Field() + " must not exceed " + e.Param() + " characters"
	default:
		return e.Field() + " is invalid"
	}
}
