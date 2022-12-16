package docker

import (
	"context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
)

func Ls() ([]types.ImageSummary, error) {
	cli := Client()
	return cli.ImageList(context.Background(), types.ImageListOptions{})
}

func Remove(imageId string) error {
	cli := Client()
	_, err := cli.ImageRemove(context.Background(), imageId, types.ImageRemoveOptions{})
	return err
}

func Prune() (types.ImagesPruneReport, error) {
	cli := Client()
	return cli.ImagesPrune(context.Background(), filters.Args{})
}
