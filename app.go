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
	runtime.LogInfo(a.ctx, "container ps")
	containers, err := container.Ps()
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
		dialog.ShowErrorDialog(a.ctx, err)
	}
	return containers
}

func wrapMutation(ctx context.Context, err error) bool {
	if err != nil {
		runtime.LogError(ctx, err.Error())
		dialog.ShowErrorDialog(ctx, err)
		return false
	}
	return true
}

func (a *App) ContainerStart(id string) bool {
	runtime.LogInfof(a.ctx, "container start, id: %s", id)
	return wrapMutation(a.ctx, container.Start(id))
}

func (a *App) ContainerStop(id string) bool {
	runtime.LogInfof(a.ctx, "container stop, id: %s", id)
	return wrapMutation(a.ctx, container.Stop(id))
}

func (a *App) ContainerRestart(id string) bool {
	runtime.LogInfof(a.ctx, "container restart, id: %s", id)
	return wrapMutation(a.ctx, container.Restart(id))
}

func (a *App) ContainerPause(id string) bool {
	runtime.LogInfof(a.ctx, "container pause, id: %s", id)
	return wrapMutation(a.ctx, container.Pause(id))
}

func (a *App) ContainerUnpause(id string) bool {
	runtime.LogInfof(a.ctx, "container unpause, id: %s", id)
	return wrapMutation(a.ctx, container.Unpause(id))
}

func (a *App) ContainerRemove(id string) bool {
	runtime.LogInfof(a.ctx, "container remove, id: %s", id)
	return wrapMutation(a.ctx, container.Remove(id))
}

func (a *App) ImageLs() []types.ImageSummary {
	runtime.LogInfo(a.ctx, "image ls")
	images, err := image.Ls()
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
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
