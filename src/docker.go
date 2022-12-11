package docker

import "os/exec"

type PsOutput struct {
	ContainerID string `json:"containerId"`
	Image       string `json:"image"`
	Command     string `json:"command"`
	Created     string `json:"created"`
	Status      string `json:"status"`
	Ports       string `json:"ports"`
}

func Ps() (string, error) {
	out, err := exec.Command("docker", "ps").Output()
	return string(out), err
}
