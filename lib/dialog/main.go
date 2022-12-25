package dialog

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// ShowErrorDialog TODO: Emit error event and show dialog on Frontend instead of showing dialog on Go
func ShowErrorDialog(ctx context.Context, err error) {
	_, er := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:         runtime.ErrorDialog,
		Title:        "Error",
		Message:      err.Error(),
		CancelButton: "Close",
	})
	if er != nil {
		runtime.LogError(ctx, er.Error())
	}
}

func ShowDialog(ctx context.Context, title string, message string) {
	_, er := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:         runtime.InfoDialog,
		Title:        title,
		Message:      message,
		CancelButton: "Close",
	})
	if er != nil {
		runtime.LogError(ctx, er.Error())
	}
}
