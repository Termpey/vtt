package main

import (
	"flag"
	"fmt"
	"vtt/api/server"
)

func main() {
	port := flag.String("server-port", ":8080", "Sets the API server listening port")

	server.Init(*port)
	fmt.Println("Server listening on port " + *port)
}
