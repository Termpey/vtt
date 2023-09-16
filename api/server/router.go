package server

import (
	"vtt/api/controllers"

	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.Default()

	controllers.InitUserMap(router)

	return router
}
