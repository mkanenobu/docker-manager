import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

export const useContainerAction = () => {
  const { showSuccessToast, showErrorToast } = useToast();

  const pauseContainer = async (id: string) => {
    return wails
      .ContainerPause(id)
      .then(() => {
        showSuccessToast("Container started");
      })
      .catch((err) => {
        console.error(err);
        showErrorToast("start container", err.message);
      });
  };

  const unpauseContainer = async (id: string) => {
    return wails
      .ContainerUnpause(id)
      .then(() => {
        showSuccessToast("Container unpaused");
      })
      .catch((err) => {
        console.error(err);
        showErrorToast("unpause container", err.message);
      });
  };

  const stopContainer = async (id: string) => {
    return wails
      .ContainerStop(id)
      .then(() => {
        showSuccessToast("Container stopped");
      })
      .catch((err) => {
        showErrorToast("stop container", err.message);
      });
  };

  return { pauseContainer, unpauseContainer, stopContainer };
};
