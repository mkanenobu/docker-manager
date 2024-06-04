import {
  BorderOutlined,
  CaretRightOutlined,
  CodeOutlined,
  DeleteOutlined,
  PauseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { type FC } from "react";
import { ActionMenu, type MenuAction } from "~/components/Atom/ActionMenu";
import { copyToClipboard } from "~/helpers/copy-to-clipboard";
import { shortenSha256Hash } from "~/helpers/string-helper";
import { useContainerActions } from "~/hooks/container-actions";
import { useToast } from "~/hooks/toast-hooks";
import { ContainerState } from "~/models/container";

export const ContainerActionMenu: FC<{
  containerId: string;
  state: ContainerState;
}> = ({ containerId, state }) => {
  const {
    stopContainer,
    pauseContainer,
    unpauseContainer,
    startContainer,
    restartContainer,
    removeContainer,
  } = useContainerActions();
  const { showSuccessToast } = useToast();

  const onClick = (action: () => Promise<unknown>) => () => {
    return action();
  };

  const actions: MenuAction[] = [
    {
      key: "copyExecCommand",
      label: "Copy exec command",
      icon: <CodeOutlined />,
      onClick: () =>
        copyToClipboard(
          `docker exec -it ${shortenSha256Hash(containerId)} `
        ).then(() => {
          showSuccessToast("Copied exec command to clipboard");
        }),
      show: state === "running",
    },
    {
      key: "start",
      label: "Start",
      icon: <CaretRightOutlined />,
      onClick: () => startContainer(containerId),
      show: state === "exited",
    },
    {
      key: "restart",
      label: "Restart",
      icon: <SyncOutlined />,
      onClick: () => restartContainer(containerId),
      show: state === "running",
    },
    {
      key: "stop",
      label: "Stop",
      icon: <BorderOutlined />,
      onClick: () => stopContainer(containerId),
      show: !["exited", "removing", "dead"].includes(state),
    },
    {
      key: "pause",
      label: "Pause",
      icon: <PauseOutlined />,
      onClick: () => pauseContainer(containerId),
      show: state === "running",
    },
    {
      key: "unpause",
      label: "Unpause",
      icon: <CaretRightOutlined />,
      onClick: () => unpauseContainer(containerId),
      show: state === "paused",
    },
    {
      key: "remove",
      label: "Remove",
      icon: <DeleteOutlined />,
      onClick: () => removeContainer(containerId),
      show: true,
    },
  ]
    .filter((action) => action.show)
    .map((action) => ({
      ...action,
      onClick: onClick(action.onClick),
    }));

  return <ActionMenu items={actions} />;
};
