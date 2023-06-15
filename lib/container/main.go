package container

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
)

// Container is return type of Ps
type Container struct {
	Id      string            `json:"Id"`
	Names   []string          `json:"Names"`
	Image   string            `json:"Image"`
	ImageID string            `json:"ImageID"`
	Command string            `json:"Command"`
	Created int64             `json:"Created"`
	Ports   []types.Port      `json:"Ports,omitempty"`
	Labels  map[string]string `json:"Labels,omitempty"`
	State   string            `json:"State"`
	Status  string            `json:"Status"`
}

// ContainerDetail is return type of Inspect
type ContainerDetail struct {
	ID              string                `json:"Id"`
	Created         string                `json:"Created"`
	Path            string                `json:"Path"`
	Args            []string              `json:"Args"`
	State           *types.ContainerState `json:"State"`
	Image           string                `json:"Image"`
	ResolvConfPath  string                `json:"ResolvConfPath"`
	HostnamePath    string                `json:"HostnamePath"`
	HostsPath       string                `json:"HostsPath"`
	LogPath         string                `json:"LogPath"`
	Name            string                `json:"Name"`
	RestartCount    int                   `json:"RestartCount"`
	Driver          string                `json:"Driver"`
	Platform        string                `json:"Platform"`
	MountLabel      string                `json:"MountLabel"`
	ProcessLabel    string                `json:"ProcessLabel"`
	AppArmorProfile string                `json:"AppArmorProfile"`
	ExecIDs         []string              `json:"ExecIDs"`
	HostConfig      *container.HostConfig `json:"HostConfig"`
	GraphDriver     types.GraphDriverData `json:"GraphDriver"`
	SizeRw          *int64                `json:"SizeRw,omitempty"`
	SizeRootFs      *int64                `json:"SideRootFs,omitempty"`
}

func mapBuiltInContainerToContainer(c types.Container) Container {
	return Container{
		Id:      c.ID,
		Names:   c.Names,
		Image:   c.Image,
		ImageID: c.ImageID,
		Command: c.Command,
		Created: c.Created,
		Ports:   c.Ports,
		Labels:  c.Labels,
		State:   c.State,
		Status:  c.Status,
	}
}

func Ps() ([]Container, error) {
	cli := docker.Client()
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{All: true})
	cs := []Container{}

	for _, c := range containers {
		cs = append(cs, mapBuiltInContainerToContainer(c))
	}

	return cs, err
}

func Start(id string) error {
	cli := docker.Client()
	return cli.ContainerStart(context.Background(), id, types.ContainerStartOptions{})
}

func Stop(id string) error {
	cli := docker.Client()
	return cli.ContainerStop(context.Background(), id, container.StopOptions{})
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
	return cli.ContainerRestart(context.Background(), id, container.StopOptions{})
}

func Remove(id string) error {
	cli := docker.Client()
	return cli.ContainerRemove(context.Background(), id, types.ContainerRemoveOptions{})
}

func mapContainerJSONtoContainerDetail(c types.ContainerJSON) ContainerDetail {
	return ContainerDetail{
		ID:              c.ID,
		Created:         c.Created,
		Path:            c.Path,
		Args:            c.Args,
		State:           c.State,
		Image:           c.Image,
		ResolvConfPath:  c.ResolvConfPath,
		HostnamePath:    c.HostnamePath,
		HostsPath:       c.HostsPath,
		LogPath:         c.LogPath,
		Name:            c.Name,
		RestartCount:    c.RestartCount,
		Driver:          c.Driver,
		Platform:        c.Platform,
		MountLabel:      c.MountLabel,
		ProcessLabel:    c.ProcessLabel,
		AppArmorProfile: c.AppArmorProfile,
		ExecIDs:         c.ExecIDs,
		HostConfig:      c.HostConfig,
		GraphDriver:     c.GraphDriver,
		SizeRw:          c.SizeRw,
		SizeRootFs:      c.SizeRootFs,
	}
}

func Inspect(id string) (ContainerDetail, error) {
	cli := docker.Client()
	c, err := cli.ContainerInspect(context.Background(), id)
	return mapContainerJSONtoContainerDetail(c), err
}
