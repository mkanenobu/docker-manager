package docker

import (
	"context"
	"github.com/docker/docker/api/types"
)

type Container struct {
	ID         string   `json:"Id"`
	Names      []string `json:"Names"`
	Image      string   `json:"Image"`
	ImageID    string   `json:"ImageID"`
	Command    string   `json:"Command"`
	Created    int64    `json:"Created"`
	SizeRw     int64    `json:",omitempty"`
	SizeRootFs int64    `json:",omitempty"`
	Labels     map[string]string
	State      string `json:"State"`
	Status     string `json:"Status"`
}

func Ps() ([]Container, error) {
	cli := Client()
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	cs := []Container{}

	for _, v := range containers {
		cs = append(cs, Container{
			ID:         v.ID,
			Names:      v.Names,
			Image:      v.Image,
			ImageID:    v.ImageID,
			Command:    v.Command,
			Created:    v.Created,
			SizeRw:     v.SizeRw,
			SizeRootFs: v.SizeRootFs,
			Labels:     v.Labels,
			State:      v.State,
			Status:     v.Status,
		})
	}

	return cs, err
}
