package events

import (
	"context"
	"github.com/docker/docker/api/types/events"
	"github.com/docker/docker/api/types/filters"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const ContainerEventName = "container-events"

func subscribeContainerEvents(unsubscribeCh chan bool, onReceive func(msg Message), onError func(err error)) {
	f := filters.NewArgs(
		filters.Arg("type", "container"),
	)
	NewDockerEventsSubscriber(f)(unsubscribeCh, onReceive, onError)
}

func EmitContainerEvents(ctx *context.Context) {
	unsubscribeCh := make(chan bool)
	defer (func() { close(unsubscribeCh) })()

	onReceive := func(msg events.Message) {
		runtime.EventsEmit(*ctx, ContainerEventName, msg)
	}
	onError := func(err error) {
	}

	subscribeContainerEvents(unsubscribeCh, onReceive, onError)
}
