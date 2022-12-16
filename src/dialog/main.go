package dialog

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func ShowErrorDialog(ctx context.Context, err error) {
	_, er := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:         runtime.ErrorDialog,
		Title:        "Error",
		Message:      err.Error(),
		CancelButton: "Close",
	})
	if er != nil {
		panic(er)
	}
}
