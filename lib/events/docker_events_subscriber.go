package events

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/events"
	"github.com/docker/docker/api/types/filters"
)

// `docker events` docs https://docs.docker.com/engine/reference/commandline/events/
type Message = events.Message

type EventSubscriber func(unsubscribeCh chan bool, onReceive func(msg Message), onError func(err error))

func NewDockerEventsSubscriber(filters filters.Args) EventSubscriber {
	return func(unsubscribeCh chan bool, onReceive func(msg Message), onError func(err error)) {
		cli := docker.Client()

		for {
			select {
			case <-unsubscribeCh:
				break
			default:
				// fall through
			}

			ch, errCh := cli.Events(context.Background(), types.EventsOptions{Filters: filters})

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
}
