package docker

import (
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
