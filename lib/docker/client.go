package docker

import (
	"docker-manager/lib/settings"
	"github.com/docker/docker/client"
)

func WithSettings(c *client.Client) error {
	s := settings.GetSettings()
	if len(s.Socket) != 0 {
		err := client.WithHost("unix://" + s.Socket)(c)
		if err != nil {
			return err
		}
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
