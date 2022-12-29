package main

import (
	"docker-manager/lib/settings"
	"os"
	"path"
)

func main() {
	p := path.Join(os.Getenv("HOME"), ".rd", "docker.socket")
	settings.SaveSettings(&settings.Settings{Socket: p})
}
