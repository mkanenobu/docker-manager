package container

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
)

type Container struct {
	ID      string       `json:"Id"`
	Names   []string     `json:"Names"`
	Image   string       `json:"Image"`
	ImageID string       `json:"ImageID"`
	Command string       `json:"Command"`
	Created int64        `json:"Created"`
	Ports   []types.Port `json:"Ports"`
	Labels  map[string]string
	State   string `json:"State"`
	Status  string `json:"Status"`
}

func Ps() ([]Container, error) {
	cli := docker.Client()
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{All: true})
	cs := []Container{}

	for _, v := range containers {
		cs = append(cs, Container{
			ID:      v.ID,
			Names:   v.Names,
			Image:   v.Image,
			ImageID: v.ImageID,
			Command: v.Command,
			Created: v.Created,
			Ports:   v.Ports,
			Labels:  v.Labels,
			State:   v.State,
			Status:  v.Status,
		})
	}

	return cs, err
}

func Start(id string) error {
	cli := docker.Client()
	return cli.ContainerStart(context.Background(), id, types.ContainerStartOptions{})
}

func Stop(id string) error {
	cli := docker.Client()
	return cli.ContainerStop(context.Background(), id, nil)
}

func Pause(id string) error {
	cli := docker.Client()
	return cli.ContainerPause(context.Background(), id)
}

func Unpause(id string) error {
	cli := docker.Client()
	return cli.ContainerUnpause(context.Background(), id)
}

func Restart(id string) error {
	cli := docker.Client()
	return cli.ContainerRestart(context.Background(), id, nil)
}

func Remove(id string) error {
	cli := docker.Client()
	return cli.ContainerRemove(context.Background(), id, types.ContainerRemoveOptions{})
}
