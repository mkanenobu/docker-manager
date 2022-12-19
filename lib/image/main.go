package image

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
)

func Ls() ([]types.ImageSummary, error) {
	cli := docker.Client()
	return cli.ImageList(context.Background(), types.ImageListOptions{})
}

func Remove(imageId string) error {
	cli := docker.Client()
	_, err := cli.ImageRemove(context.Background(), imageId, types.ImageRemoveOptions{})
	return err
}
