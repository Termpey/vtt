package server

import (
	"vtt/api/controllers"

	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.New()

	controllers.InitUserMap(router)

	return router
}
