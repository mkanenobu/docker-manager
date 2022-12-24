package events

import (
	"context"
	"docker-manager/lib/docker"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/events"
	"github.com/docker/docker/api/types/filters"
)

type Message = events.Message

// type=container and scope=local
func containerEventsFilter() filters.Args {
	return filters.NewArgs(
		filters.Arg("type", "container"),
		filters.Arg("scope", "local"),
	)
}

// returns Unsubscribe function
func SubscribeContainerEvents(unsubscribeCh chan bool, onReceive func(msg Message), onError func(err error)) {
	cli := docker.Client()

	for {
		select {
		case <-unsubscribeCh:
			break
		default:
			// fall through
		}

		ch, errCh := cli.Events(context.Background(), types.EventsOptions{Filters: containerEventsFilter()})

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
