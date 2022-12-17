import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

export const useContainerActions = () => {
  const { showSuccessToast, showErrorToast } = useToast();

  const requestWrapper = async (
    res: Promise<unknown>,
    messages: { operation: string; successMsg: string }
  ) => {
    await res
      .then(() => {
        showSuccessToast(messages.successMsg);
      })
      .catch((err) => {
        showErrorToast(messages.operation, err.message);
      });
    return res;
  };

  const pauseContainer = (id: string) => {
    return requestWrapper(wails.ContainerPause(id), {
      operation: "pause container",
      successMsg: "Container paused",
    });
  };

  const unpauseContainer = (id: string) => {
    return requestWrapper(wails.ContainerUnpause(id), {
      operation: "unpause container",
      successMsg: "Container unpaused",
    });
  };

  const stopContainer = (id: string) => {
    return requestWrapper(wails.ContainerStop(id), {
      operation: "stop container",
      successMsg: "Container stopped",
    });
  };

  const startContainer = (id: string) => {
    return requestWrapper(wails.ContainerStart(id), {
      operation: "start container",
      successMsg: "Container started",
    });
  };

  const restartContainer = (id: string) => {
    return requestWrapper(wails.ContainerRestart(id), {
      operation: "restart container",
      successMsg: "Container restarted",
    });
  };

  return {
    pauseContainer,
    unpauseContainer,
    stopContainer,
    startContainer,
    restartContainer,
  };
};
