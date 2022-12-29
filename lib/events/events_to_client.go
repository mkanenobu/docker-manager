package events

import (
	"context"
	"github.com/docker/docker/api/types/events"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	ContainerEventsName = "container-events"
	ImageEventsName     = "image-events"
)

func EmitContainerEvents(ctx *context.Context) {
	unsubscribeCh := make(chan bool)
	defer (func() { close(unsubscribeCh) })()

	onReceive := func(msg events.Message) {
		runtime.EventsEmit(*ctx, ContainerEventsName, msg)
	}
	onError := func(err error) {
	}

	SubscribeContainerEvents(unsubscribeCh, onReceive, onError)
}

func EmitImageEvents(ctx *context.Context) {
	unsubscribeCh := make(chan bool)
	defer (func() { close(unsubscribeCh) })()

	onReceive := func(msg events.Message) {
		runtime.EventsEmit(*ctx, ImageEventsName, msg)
	}
	onError := func(err error) {
	}

	SubscribeImageEvents(unsubscribeCh, onReceive, onError)
}
