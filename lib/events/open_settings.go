package events

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const OpenSettingsEventName = "open-settings"

func EmitOpenSettingsEvent(ctx context.Context) {
	runtime.EventsEmit(ctx, OpenSettingsEventName, nil)
}
