export type ContainerState =
  | "running"
  | "paused"
  | "exited"
  | "created"
  | "restarting"
  | "removing"
  | "dead";
