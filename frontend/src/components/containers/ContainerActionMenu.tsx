import {
  BorderOutlined,
  CaretRightOutlined,
  CodeOutlined,
  DeleteOutlined,
  PauseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useState, type FC } from "react";
import { ActionMenu, MenuAction } from "~/components/Atom/ActionMenu";
import { copyToClipboard } from "~/helpers/copy-to-clipboard";
import { useContainerActions } from "~/hooks/container-actions";
import { ContainerState } from "~/models/container";

export const ContainerActionMenu: FC<{
  containerId: string;
  state: ContainerState;
  revalidateContainers: () => Promise<unknown>;
}> = ({ containerId, state, revalidateContainers }) => {
  const [opened, setOpened] = useState(false);
  const {
    stopContainer,
    pauseContainer,
    unpauseContainer,
    startContainer,
    restartContainer,
    removeContainer,
  } = useContainerActions();

  const onClick =
    (action: () => Promise<unknown>, noNeedToRevalidate: boolean) => () => {
      setOpened(false);
      action().then(() => !noNeedToRevalidate && revalidateContainers());
    };

  const actions: Array<
    MenuAction & { show: boolean; noNeedToRevalidate?: boolean }
  > = [
    {
      key: "copyExecCommand",
      label: "Copy exec command",
      icon: <CodeOutlined />,
      onClick: () =>
        copyToClipboard(`docker exec -it ${containerId.slice(0, 11)} `),
      show: state === "running",
      noNeedToRevalidate: true,
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
      onClick: onClick(action.onClick, !!action.noNeedToRevalidate),
    }));

  return <ActionMenu opened={opened} setOpened={setOpened} actions={actions} />;
};
