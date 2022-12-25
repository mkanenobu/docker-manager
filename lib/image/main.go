package image

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
)

func Ls() ([]types.ImageSummary, error) {
	cli := docker.Client()
	return cli.ImageList(context.Background(), types.ImageListOptions{})
}

func Remove(id string) error {
	cli := docker.Client()
	_, err := cli.ImageRemove(context.Background(), id, types.ImageRemoveOptions{})
	return err
}

type ImageDetail struct {
	ID              string            `json:"Id"`
	RepoTags        []string          `json:"RepoTags"`
	RepoDigests     []string          `json:"RepoDigests"`
	Parent          string            `json:"Parent"`
	Comment         string            `json:"Comment"`
	Created         string            `json:"Created"`
	Container       string            `json:"Container"`
	ContainerConfig *container.Config `json:"ContainerConfig,omitempty"`
	DockerVersion   string            `json:"DockerVersion"`
	Author          string            `json:"Author"`
	Config          *container.Config `json:"Config,omitempty"`
	Architecture    string            `json:"Architecture"`
	Variant         string            `json:"Variant,omitempty"`
	Os              string            `json:"Os"`
	OsVersion       string            `json:"OsVersion,omitempty"`
	Size            int64             `json:"Size"`
	VirtualSize     int64             `json:"VirtualSize"`
}

func mapInspectResultToImageDetail(r types.ImageInspect) ImageDetail {
	return ImageDetail{
		ID:              r.ID,
		RepoTags:        r.RepoTags,
		RepoDigests:     r.RepoDigests,
		Parent:          r.Parent,
		Comment:         r.Comment,
		Created:         r.Created,
		Container:       r.Container,
		ContainerConfig: r.ContainerConfig,
		DockerVersion:   r.DockerVersion,
		Author:          r.Author,
		Config:          r.Config,
		Architecture:    r.Architecture,
		Variant:         r.Variant,
		Os:              r.Os,
		OsVersion:       r.OsVersion,
		Size:            r.Size,
		VirtualSize:     r.VirtualSize,
	}
}

func Inspect(id string) (ImageDetail, error) {
	cli := docker.Client()
	res, _, err := cli.ImageInspectWithRaw(context.Background(), id)
	return mapInspectResultToImageDetail(res), err
}
