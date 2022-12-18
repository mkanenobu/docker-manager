package app_menu

import (
	"context"
	"docker-manager/lib/dialog"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func AppMenu(ctx *context.Context) *menu.Menu {
	appMenu := menu.NewMenu()

	fileMenu := appMenu.AddSubmenu("File")
	fileMenu.AddText("Reload", keys.CmdOrCtrl("r"), func(_ *menu.CallbackData) {
		runtime.WindowReload(*ctx)
	})
	fileMenu.AddText("Quit docker-manager", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		runtime.Quit(*ctx)
	})

	if runtime.Environment(context.Background()).Platform == "darwin" {
		appMenu.Append(menu.EditMenu())
	}

	licenseMenu := appMenu.AddSubmenu("License")
	licenseMenu.AddText("Icon License", nil, func(_ *menu.CallbackData) {
		dialog.ShowDialog(*ctx, "Icon License", "Whale icons created by Freepik - Flaticon\nhttps://www.flaticon.com/free-icons/whale")
	})

	return appMenu
}
