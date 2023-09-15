package services

import (
	"bytes"
	"fmt"
	"io"

	"vtt/api/aws"
	"vtt/api/db"
	"vtt/api/user-map/models"
)

func InitUserMapService() {
	db.Connect()
	db.Database.AutoMigrate(&models.BattleMap{})
}

func SaveUserMap(newBattleMap models.NewBattleMap) (*models.BattleMap, error) {

	file, _ := newBattleMap.File.Open()

	buf := bytes.NewBuffer(nil)

	io.Copy(buf, file)
	result, err := aws.SaveFile(buf)

	if err != nil {
		return &models.BattleMap{}, err
	}

	toReturn := &models.BattleMap{}

	toReturn = toReturn.FromNewBattleMap(newBattleMap, result)

	fmt.Println(toReturn)

	toReturn, err = toReturn.Save()

	if err != nil {
		return &models.BattleMap{}, err
	}

	return toReturn, nil
}
