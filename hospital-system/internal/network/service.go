package network

import "github.com/gin-gonic/gin"

func Success(ctx *gin.Context, code int, message string, data any) {
	res := Response{
		Success: true,
		Code:    code,
		Message: message,
		Data:    data,
	}

	ctx.JSON(code, &res)
}

func Error(ctx *gin.Context, code int, message string) {
	res := Response{
		Success: false,
		Code:    code,
		Message: message,
	}

	ctx.JSON(code, &res)
}

func ValidationError(ctx *gin.Context, errors []FieldError) {
	res := Response{
		Success: false,
		Code:    400,
		Message: "Validation failed",
		Errors:  errors,
	}

	ctx.JSON(400, &res)
}
