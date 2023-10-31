package services

import (
	"bytes"
	"fmt"
	"io"
	"strings"

	"vtt/api/aws"
	"vtt/api/db"
	"vtt/api/user-map/models"
)

func InitUserMapService() {
	db.Connect()
	err := db.Database.AutoMigrate(&models.BattleMap{})

	if err != nil {
		fmt.Println("Couldnt Connect to the Database... Aborting")
		panic(err)
	}
}

func SaveBattleMap(newBattleMap models.NewBattleMap) (*models.BattleMap, error) {

	file, _ := newBattleMap.File.Open()

	fileNameSplit := strings.Split(newBattleMap.File.Filename, ".")
	mapName := newBattleMap.Name + "." + fileNameSplit[len(fileNameSplit)-1]

	buf := bytes.NewBuffer(nil)

	_, err := io.Copy(buf, file)

	if err != nil {
		return &models.BattleMap{}, err
	}

	result, err := aws.SaveFile(buf, mapName)

	if err != nil {
		return &models.BattleMap{}, err
	}

	toReturn := &models.BattleMap{}

	toReturn = toReturn.FromNewBattleMap(newBattleMap, result)

	toReturn, err = toReturn.Save()

	if err != nil {
		return &models.BattleMap{}, err
	}

	return toReturn, nil
}

func UpdateBattleMap(battleMap models.BattleMap) (*models.BattleMap, error) {
	toReturn, err := battleMap.Update()

	if err != nil {
		return nil, err
	}

	return toReturn, nil
}

func DeleteBattleMap(id int) (*models.BattleMap, error) {
	toDelete, err := GetBattleMapById(id)

	if err != nil {
		return nil, err
	}

	toReturn, err := toDelete.Delete()

	if err != nil {
		return nil, err
	}

	return toReturn, nil
}

func GetBattleMapById(id int) (*models.BattleMap, error) {
	toReturn := models.BattleMap{}

	err := db.Database.First(&toReturn, id).Error

	if err != nil {
		return nil, err
	}

	toReturn.StoragePath, err = aws.GetSignedFileUrl(toReturn.StoragePath)

	if err != nil {
		return nil, err
	}

	return &toReturn, nil
}

func GetBattleMaps() (*[]models.BattleMap, error) {
	var toReturn []models.BattleMap

	err := db.Database.Find(&toReturn).Error

	if err != nil {
		return nil, err
	}

	return &toReturn, nil
}
