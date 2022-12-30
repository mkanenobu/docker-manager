package events

import (
	"context"
	"github.com/docker/docker/api/types/events"
	"github.com/docker/docker/api/types/filters"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const ImageEventName = "image-events"

func subscribeImageEvents(unsubscribeCh chan bool, onReceive func(msg Message), onError func(err error)) {
	f := filters.NewArgs(
		filters.Arg("type", "image"),
	)
	NewDockerEventsSubscriber(f)(unsubscribeCh, onReceive, onError)
}

func EmitImageEvents(ctx *context.Context) {
	unsubscribeCh := make(chan bool)
	defer (func() { close(unsubscribeCh) })()

	onReceive := func(msg events.Message) {
		runtime.EventsEmit(*ctx, ImageEventName, msg)
	}
	onError := func(err error) {
	}

	subscribeImageEvents(unsubscribeCh, onReceive, onError)
}
