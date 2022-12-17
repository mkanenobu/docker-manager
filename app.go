package main

import (
	"context"
	"docker-manager/src/container"
	"docker-manager/src/dialog"
	"docker-manager/src/image"
	"github.com/docker/docker/api/types"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
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

func wrapMutation(ctx context.Context, err error) bool {
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(ctx, err)
		return false
	}
	return true
}

func (a *App) ContainerStart(id string) bool {
	log.Printf("ContainerStart, id: %s", id)
	return wrapMutation(a.ctx, container.Start(id))
}

func (a *App) ContainerStop(id string) bool {
	log.Printf("ContainerStop, id: %s", id)
	return wrapMutation(a.ctx, container.Stop(id))
}

func (a *App) ContainerRestart(id string) bool {
	log.Printf("ContainerRestart, id: %s", id)
	return wrapMutation(a.ctx, container.Restart(id))
}

func (a *App) ContainerPause(id string) bool {
	log.Printf("ContainerPause, id: %s", id)
	return wrapMutation(a.ctx, container.Pause(id))
}

func (a *App) ContainerUnpause(id string) bool {
	log.Printf("ContainerUnpause, id: %s", id)
	return wrapMutation(a.ctx, container.Unpause(id))
}

func (a *App) ContainerRemove(id string) bool {
	log.Printf("ContainerRemove, id: %s", id)
	return wrapMutation(a.ctx, container.Remove(id))
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

// Menu
func (a *App) appMenu() *menu.Menu {
	AppMenu := menu.NewMenu()

	FileMenu := AppMenu.AddSubmenu("File")
	FileMenu.AddText("Quit docker-manager", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		runtime.Quit(a.ctx)
	})

	if runtime.Environment(context.Background()).Platform == "darwin" {
		AppMenu.Append(menu.EditMenu())
	}

	LicenseMenu := AppMenu.AddSubmenu("License")
	LicenseMenu.AddText("Icon License", nil, func(_ *menu.CallbackData) {
		dialog.ShowDialog(a.ctx, "Icon License", "Whale icons created by Freepik - Flaticon\nhttps://www.flaticon.com/free-icons/whale")
	})

	return AppMenu
}
