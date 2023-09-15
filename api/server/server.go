package server

import "github.com/joho/godotenv"

func Init(port string) {
	err := godotenv.Load(".env")

	if err != nil {
		panic(err)
	}

	router := NewRouter()

	router.Run(port)
}
