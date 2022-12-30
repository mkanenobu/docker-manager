package docker

import (
	"context"
	"docker-manager/lib/settings"
	"github.com/docker/docker/client"
)

func WithSettings(c *client.Client) error {
	s := settings.GetSettings()

	if s.Socket != nil && len(*s.Socket) != 0 {
		return client.WithHost("unix://" + *s.Socket)(c)
	}
	return nil
}

func Client() *client.Client {
	cli, err := client.NewClientWithOpts(WithSettings, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()
	return cli
}

func CheckConnection(ctx *context.Context, host string) error {
	cli, err := client.NewClientWithOpts(client.WithHost("unix://"+host), client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}
	_, err = cli.Ping(*ctx)
	return err
}
