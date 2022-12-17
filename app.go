package main

import (
	"context"
	"docker-manager/src/container"
	"docker-manager/src/dialog"
	"docker-manager/src/image"
	"github.com/docker/docker/api/types"
	"log"
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

func (a *App) ContainerPs() []container.Container {
	log.Print("ContainerPs")
	containers, err := container.Ps()
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
	return containers
}

func (a *App) ContainerStart(id string) {
	log.Print("ContainerStart", id)
	err := container.Start(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerStop(id string) {
	log.Print("ContainerStop", id)
	err := container.Stop(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerRestart(id string) {
	log.Print("ContainerRestart", id)
	err := container.Restart(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerPause(id string) {
	log.Print("ContainerPause", id)
	err := container.Pause(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerUnpause(id string) {
	log.Print("ContainerUnpause", id)
	err := container.Unpause(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ImageLs() []types.ImageSummary {
	log.Print("ImageLs")
	images, err := image.Ls()
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
	return images
}
