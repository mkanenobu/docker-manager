package settings

import (
	"encoding/json"
	"os"
	"path"
)

var SettingsFileName = "settings.json"
var SettingsFileDir = path.Join(os.Getenv("HOME"), ".config", "docker-manager")
var SettingsFileLocation = path.Join(SettingsFileDir, SettingsFileName)

type Settings struct {
	Socket *string `json:"socket,omitempty"`
}

func isSettingsFileExists() bool {
	_, err := os.Stat(SettingsFileLocation)
	return !os.IsNotExist(err)
}

func createSettingsFile() error {
	err := os.MkdirAll(SettingsFileDir, 0755)
	if err != nil {
		return err
	}
	_, err = os.Create(SettingsFileLocation)
	return err
}

func GetSettings() *Settings {
	s := &Settings{}
	f, _ := os.ReadFile(SettingsFileLocation)
	json.Unmarshal(f, s)

	return s
}

func SaveSettings(s *Settings) error {
	o, _ := json.MarshalIndent(s, "", "  ")

	if !isSettingsFileExists() {
		err := createSettingsFile()
		if err != nil {
			return err
		}
	}

	return os.WriteFile(SettingsFileLocation, o, 0644)
}
