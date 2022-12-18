package docker

import (
	"context"
	"github.com/docker/docker/client"
)

func Client() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}
	cli.NegotiateAPIVersion(context.Background())
	defer cli.Close()
	return cli
}
