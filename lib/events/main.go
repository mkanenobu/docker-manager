package events

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/events"
)

type Message = events.Message

// returns Unsubscribe function
func Subscribe(unsubscribeCh chan bool, onReceive func(msg events.Message), onError func(err error)) {
	cli := docker.Client()

	for {
		select {
		case <-unsubscribeCh:
			break
		default:
			// fall through
		}

		ch, errCh := cli.Events(context.Background(), types.EventsOptions{})

		select {
		case err := <-errCh:
			if err != nil {
				onError(err)
			}
		case msg := <-ch:
			onReceive(msg)
		}
	}
}
