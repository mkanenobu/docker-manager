import { FC } from "react";
import { Button, Text } from "@geist-ui/core";
import { DockerPause, DockerUnpause } from "../../wailsjs/go/main/App";
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
    return DockerUnpause(containerId)
      .then((res) => {
        if (res) {
          showErrorToast("unpause", res);
        } else {
          showSuccessToast("Container unpaused");
        }
      })
      .catch((err) => {
        showErrorToast("unpause", err.message);
      });
  };
  const pause = () => {
    return DockerPause(containerId)
      .then((res) => {
        if (res) {
          console.error(res);
          showErrorToast("pause", res);
        } else {
          showSuccessToast("Container paused");
        }
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
