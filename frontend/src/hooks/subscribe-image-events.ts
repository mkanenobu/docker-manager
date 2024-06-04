import { useEffect } from "react";
import { runtime } from "~/wails";

export type ImageEventAction = "pull" | "untag" | "delete";

export type ImageEvent = {
  status: string;
  // container id
  id: string;
  // container image tag?
  from: string;
  Type: "image";
  Action: ImageEventAction;
  Actor: {
    ID: string;
    Attributes: Record<string, string>;
  };
  scope: "local";
  time: number;
  timeNano: number;
};

const imageEventName = "image-events" as const;

export const useSubscribeImageEvents = (
  eventHandler: (e: ImageEvent) => void
) => {
  useEffect(() => {
    console.info("Subscribe image-events");
    runtime.EventsOn(imageEventName, (e: ImageEvent) => eventHandler(e));

    return () => {
      console.info("Unsubscribe image-events");
      runtime.EventsOff(imageEventName);
    };
  }, []);
};
