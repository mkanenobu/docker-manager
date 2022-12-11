package main

import (
	"context"
	"docker-manager/src/docker"
	"fmt"
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) DockerPs() []docker.Container {
	out, err := docker.Ps()
	if err != nil {
		panic(err)
	}
	return out
}

func (a *App) DockerPause(id string) string {
	err := docker.Pause(id)
	if err != nil {
		return err.Error()
	}
	return ""
}

func (a *App) DockerUnpause(id string) string {
	err := docker.Unpause(id)
	if err != nil {
		return err.Error()
	}
	return ""
}

func (a *App) DockerStop(id string) string {
	err := docker.Stop(id)
	if err != nil {
		return err.Error()
	}
	return ""
}
