package settings

import (
	"encoding/json"
	"log"
	"os"
	"path"
)

var SettingsFileName = "settings.json"
var SettingsFileDir = path.Join(os.Getenv("HOME"), ".config", "docker-manager")
var SettingsFileLocation = path.Join(SettingsFileDir, SettingsFileName)

type Settings struct {
	Socket string `json:"socket"`
}

func isSettingsFileExists() bool {
	_, err := os.Stat(SettingsFileLocation)
	return !os.IsNotExist(err)
}

func createSettingsFile() {
	err := os.MkdirAll(SettingsFileDir, 0755)
	if err != nil {
		log.Print(err)
	}
	_, err = os.Create(SettingsFileLocation)
	if err != nil {
		log.Print(err)
	}
}

func GetSettings() *Settings {
	s := &Settings{}
	f, _ := os.ReadFile(SettingsFileLocation)
	json.Unmarshal(f, s)

	return s
}

func SaveSettings(s *Settings) {
	o, _ := json.Marshal(s)

	if !isSettingsFileExists() {
		createSettingsFile()
	}

	err := os.WriteFile(SettingsFileLocation, o, 0644)
	if err != nil {
		log.Print(err)
	}
}
