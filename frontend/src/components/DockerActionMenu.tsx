import { FC } from "react";
import { Button, Text } from "@geist-ui/core";
import { wails } from "../models/wails";
import { Menu } from "./atom/Menu";
import MenuIcon from "@geist-ui/icons/menu";
import { useToast } from "../hooks/toast-hooks";
import type { Status } from "../models/container";

export const DockerActionMenu: FC<{ containerId: string; status: Status }> = ({
  containerId,
  status,
}) => {
  const { showSuccessToast, showErrorToast } = useToast();

  const unpause = () => {
    return wails
      .ContainerUnpause(containerId)
      .then((res) => {
        showSuccessToast("Container unpaused");
      })
      .catch((err) => {
        showErrorToast("unpause", err.message);
      });
  };
  const pause = () => {
    return wails
      .ContainerPause(containerId)
      .then((res) => {
        showSuccessToast("Container paused");
      })
      .catch((err) => {
        console.error(err);
        showErrorToast("pause", err.message);
      });
  };

  return (
    <Menu
      content={[
        {
          label: <Text>Unpause</Text>,
          onClick: () => {
            return unpause();
          },
        },
        {
          label: <Text>Pause</Text>,
          onClick: () => {
            return pause();
          },
        },
      ]}
    >
      <Button style={{ border: "none", width: "2rem" }} icon={<MenuIcon />} />
    </Menu>
  );
};
