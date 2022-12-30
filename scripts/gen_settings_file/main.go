package main

import (
	"docker-manager/lib/settings"
	"log"
	"os"
	"path"
)

func main() {
	s := path.Join(os.Getenv("HOME"), ".rd", "docker.sock")
	err := settings.SaveSettings(&settings.Settings{Socket: &s})
	if err != nil {
		panic(err)
	}
	log.Println()
}
