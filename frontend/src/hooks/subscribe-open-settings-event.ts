import { useEffect } from "react";
import { useRouter } from "~/hooks/router-hooks";
import { runtime } from "~/wails";

const eventName = "open-settings" as const;

export const useSubscribeOpenSettingsEvent = () => {
  const router = useRouter();

  useEffect(() => {
    console.info("Subscribe open-settings");
    runtime.EventsOn(eventName, () => {
      console.info("open-settings event received");
      router.push("settings");
    });

    return () => {
      console.info("Unsubscribe open-settings");
      runtime.EventsOff(eventName);
    };
  });
};
