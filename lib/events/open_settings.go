package events

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const EventName = "open-settings"

func EmitOpenSettingsEvent(ctx context.Context) {
	runtime.EventsEmit(ctx, EventName, nil)
}
