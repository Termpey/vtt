package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"vtt/api/user-map/models"
	"vtt/api/user-map/services"

	"github.com/gin-gonic/gin"
)

const URLRoot = "/user-maps"

func InitUserMap(eng *gin.Engine) {
	services.InitUserMapService()

	userMapsGroup := eng.Group(URLRoot)
	{
		battleMapsGroup := userMapsGroup.Group("/battle-maps")
		{
			battleMapsGroup.POST("", saveBattleMap)
			battleMapsGroup.PUT("", updateBattleMap)
			battleMapsGroup.DELETE("/:id", deleteBattleMap)
			battleMapsGroup.GET("/:id", getById)
			battleMapsGroup.GET("", getBattleMaps)
		}

	}
}

func saveBattleMap(c *gin.Context) {
	var payload models.NewBattleMap

	err := c.Bind(&payload)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	newBattleMap, err := services.SaveBattleMap(payload)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, newBattleMap)

}

func updateBattleMap(c *gin.Context) {
	var payload models.BattleMap

	err := c.Bind(&payload)
	fmt.Println(payload)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	updatedMap, err := services.UpdateBattleMap(payload)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, updatedMap)
}

func deleteBattleMap(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	_, err = services.DeleteBattleMap(id)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.Status(http.StatusOK)
}

func getById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	toReturn, err := services.GetBattleMapById(id)

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, toReturn)
}

func getBattleMaps(c *gin.Context) {
	toReturn, err := services.GetBattleMaps()

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, toReturn)
}
