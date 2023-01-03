import useSWRMutation from "swr/mutation";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

export const useContainerActions = (containerId: string) => {
  const { showOperationFailedToast } = useToast();

  const { trigger: pauseContainer } = useSWRMutation(
    containerId,
    wails.ContainerPause,
    {
      onError: (err) =>
        showOperationFailedToast("pause container", err.message),
    }
  );

  const { trigger: unpauseContainer } = useSWRMutation(
    containerId,
    wails.ContainerUnpause,
    {
      onError: (err) =>
        showOperationFailedToast("unpause container", err.message),
    }
  );

  const { trigger: stopContainer } = useSWRMutation(
    containerId,
    wails.ContainerStop,
    {
      onError: (err) => showOperationFailedToast("stop container", err.message),
    }
  );

  const { trigger: startContainer } = useSWRMutation(
    containerId,
    wails.ContainerStart,
    {
      onError: (err) =>
        showOperationFailedToast("start container", err.message),
    }
  );

  const { trigger: restartContainer } = useSWRMutation(
    containerId,
    wails.ContainerRestart,
    {
      onError: (err) =>
        showOperationFailedToast("restart container", err.message),
    }
  );

  const { trigger: removeContainer } = useSWRMutation(
    containerId,
    wails.ContainerRemove,
    {
      onError: (err) =>
        showOperationFailedToast("remove container", err.message),
    }
  );

  return {
    pauseContainer,
    unpauseContainer,
    stopContainer,
    startContainer,
    restartContainer,
    removeContainer,
  };
};
