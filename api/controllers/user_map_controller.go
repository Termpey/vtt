package controllers

import (
	"net/http"
	"vtt/api/user-map/models"
	"vtt/api/user-map/services"

	"github.com/gin-gonic/gin"
)

const URLRoot = "/user-maps"

func InitUserMap(eng *gin.Engine) {
	eng.Group(URLRoot)
	{
		eng.POST("/upload", saveUserMap)
	}
	services.InitUserMapService()
}

func saveUserMap(c *gin.Context) {
	var payload models.NewBattleMap

	err := c.Bind(&payload)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	newBattleMap, err := services.SaveUserMap(payload)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, newBattleMap)

}
