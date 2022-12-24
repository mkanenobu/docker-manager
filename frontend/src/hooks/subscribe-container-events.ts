import { useEffect } from "react";
import { runtime } from "~/wails";

export type EventAction =
  | "pause"
  | "unpause"
  | "start"
  // on removed, kill -> die -> stop
  // on restarted, kill -> die -> stop -> start
  | "kill"
  | "die"
  | "stop"
  | "destroy"
  // on created, create -> start
  | "create";

export type ContainerEvent = {
  status: string;
  // container id
  id: string;
  // container image tag?
  from: string;
  Type: "container";
  Action: EventAction;
  Actor: {
    ID: string;
    Attributes: Record<string, string>;
  };
  scope: "local";
  time: number;
  timeNano: number;
};

const containerEventName = "container-events";

export const useSubscribeContainerEvents = (
  eventHandler: (e: ContainerEvent) => void
) => {
  useEffect(() => {
    console.info("Subscribe container-events");
    runtime.EventsOn(containerEventName, (e: ContainerEvent) =>
      eventHandler(e)
    );

    return () => {
      console.info("Unsubscribe container-events");
      runtime.EventsOff(containerEventName);
    };
  }, []);
};
