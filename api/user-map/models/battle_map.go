package models

import (
	"mime/multipart"
	"time"
	"vtt/api/db"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"gorm.io/gorm"
)

type NewBattleMap struct {
	File            *multipart.FileHeader `form:"file" binding:"required"`
	Name            string                `form:"name"`
	ScrollTopRatio  float32               `form:"scrollTopRatio"`
	ScrollLeftRatio float32               `form:"scrollLeftRatio"`
	ZoomRatio       float32               `form:"zoomRatio"`
}

type BattleMap struct {
	ID              uint           `gorm:"primarykey" json:"id"`
	Name            string         `gorm:"size: 100; not null" json:"name"`
	ScrollTopRatio  float32        `gorm:"not null" json:"scrollTopRatio"`
	ScrollLeftRatio float32        `gorm:"not null" json:"scrollLeftRatio"`
	ZoomRatio       float32        `gorm:"not null" json:"zoomRatio"`
	StoragePath     string         `gorm:"size: 255; not null" json:"storagePath"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func (BattleMap) TableName() string {
	return "battle_map"
}

func (battleMap *BattleMap) Save() (*BattleMap, error) {
	err := db.Database.Create(&battleMap).Error

	if err != nil {
		return &BattleMap{}, err
	}

	return battleMap, nil
}

func (battleMap *BattleMap) Update() (*BattleMap, error) {
	err := db.Database.Model(battleMap).Updates(&battleMap).Error

	if err != nil {
		return &BattleMap{}, err
	}

	return battleMap, nil
}

func (battleMap *BattleMap) Delete() (*BattleMap, error) {
	err := db.Database.Delete(&battleMap).Error

	if err != nil {
		return &BattleMap{}, err
	}

	return battleMap, nil
}

func (battleMap *BattleMap) FromNewBattleMap(new NewBattleMap, storedFile *s3manager.UploadOutput) *BattleMap {
	toReturn := &BattleMap{
		Name:            new.Name,
		ScrollTopRatio:  new.ScrollTopRatio,
		ScrollLeftRatio: new.ScrollLeftRatio,
		ZoomRatio:       new.ZoomRatio,
		StoragePath:     storedFile.Location,
	}

	return toReturn
}
