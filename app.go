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

func (a *App) ContainerStart(id string) {
	log.Printf("ContainerStart, id: %s", id)
	err := container.Start(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerStop(id string) {
	log.Printf("ContainerStop, id: %s", id)
	err := container.Stop(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerRestart(id string) {
	log.Printf("ContainerRestart, id: %s", id)
	err := container.Restart(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerPause(id string) {
	log.Printf("ContainerPause, id: %s", id)
	err := container.Pause(id)
	if err != nil {
		log.Print(err)
		dialog.ShowErrorDialog(a.ctx, err)
	}
}

func (a *App) ContainerUnpause(id string) {
	log.Printf("ContainerUnpause, id: %s", id)
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

// Menu
func (a *App) AppMenu() *menu.Menu {
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
