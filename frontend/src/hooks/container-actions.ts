import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

export const useContainerActions = () => {
  const { showOperationFailedToast } = useToast();

  const requestWrapper = async (
    res: Promise<boolean>,
    messages: { operation: string }
  ) => {
    await res.catch((err) => {
      showOperationFailedToast(messages.operation, err.message);
    });
    return res;
  };

  const pauseContainer = (id: string) => {
    return requestWrapper(wails.ContainerPause(id), {
      operation: "pause container",
    });
  };

  const unpauseContainer = (id: string) => {
    return requestWrapper(wails.ContainerUnpause(id), {
      operation: "unpause container",
    });
  };

  const stopContainer = (id: string) => {
    return requestWrapper(wails.ContainerStop(id), {
      operation: "stop container",
    });
  };

  const startContainer = (id: string) => {
    return requestWrapper(wails.ContainerStart(id), {
      operation: "start container",
    });
  };

  const restartContainer = (id: string) => {
    return requestWrapper(wails.ContainerRestart(id), {
      operation: "restart container",
    });
  };

  const removeContainer = (id: string) => {
    return requestWrapper(wails.ContainerRemove(id), {
      operation: "remove container",
    });
  };

  return {
    pauseContainer,
    unpauseContainer,
    stopContainer,
    startContainer,
    restartContainer,
    removeContainer,
  };
};
