package main

import (
	"context"
	"docker-manager/lib/container"
	"docker-manager/lib/dialog"
	"docker-manager/lib/events"
	"docker-manager/lib/image"
	"github.com/docker/docker/api/types"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) subscribeEvents() {
	unsubscribeCh := make(chan bool)
	defer (func() { close(unsubscribeCh) })()

	onReceive := func(msg events.Message) {
		runtime.EventsEmit(a.ctx, msg.Action, msg)
	}
	onError := func(err error) {
		dialog.ShowErrorDialog(a.ctx, err)
	}

	events.Subscribe(unsubscribeCh, onReceive, onError)
}

func wrapMutation(ctx context.Context, err error) bool {
	if err != nil {
		dialog.ShowErrorDialog(ctx, err)
		return false
	}
	return true
}

func (a *App) ContainerPs() []container.Container {
	containers, err := container.Ps()
	if err != nil {
		dialog.ShowErrorDialog(a.ctx, err)
	}
	return containers
}

func (a *App) ContainerStart(id string) bool {
	return wrapMutation(a.ctx, container.Start(id))
}

func (a *App) ContainerStop(id string) bool {
	return wrapMutation(a.ctx, container.Stop(id))
}

func (a *App) ContainerRestart(id string) bool {
	return wrapMutation(a.ctx, container.Restart(id))
}

func (a *App) ContainerPause(id string) bool {
	return wrapMutation(a.ctx, container.Pause(id))
}

func (a *App) ContainerUnpause(id string) bool {
	return wrapMutation(a.ctx, container.Unpause(id))
}

func (a *App) ContainerRemove(id string) bool {
	return wrapMutation(a.ctx, container.Remove(id))
}

func (a *App) ImageLs() []types.ImageSummary {
	images, err := image.Ls()
	if err != nil {
		dialog.ShowErrorDialog(a.ctx, err)
	}
	return images
}

func (a *App) ImageRemove(id string) bool {
	return wrapMutation(a.ctx, image.Remove(id))
}
