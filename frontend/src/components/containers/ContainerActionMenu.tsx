import {
  BorderOutlined,
  CaretRightOutlined,
  MenuOutlined,
  PauseOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
import { ReactElement, useState, type FC } from "react";
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
  } = useContainerActions();

  const onClick = (action: () => Promise<unknown>) => () => {
    setOpened(false);
    action().then(() => revalidateContainers());
  };

  const display = {
    start: state === "exited",
    stop: state === "running",
    restart: state === "running",
    pause: state === "running",
    unpause: state === "paused",
  };

  const actions: Record<
    string,
    {
      label: string;
      icon: ReactElement;
      onClick: () => Promise<unknown>;
      show: boolean;
    }
  > = {
    start: {
      label: "Start",
      icon: <CaretRightOutlined />,
      onClick: () => startContainer(containerId),
      show: state === "exited",
    },
    stop: {
      label: "Stop",
      icon: <BorderOutlined />,
      onClick: () => stopContainer(containerId),
      show: state === "running",
    },
    restart: {
      label: "Restart",
      icon: <RedoOutlined />,
      onClick: () => restartContainer(containerId),
      show: state === "running",
    },
    pause: {
      label: "Pause",
      icon: <PauseOutlined />,
      onClick: () => pauseContainer(containerId),
      show: state === "running",
    },
    unpause: {
      label: "Unpause",
      icon: <CaretRightOutlined />,
      onClick: () => unpauseContainer(containerId),
      show: state === "paused",
    },
  };

  return (
    <Popover
      trigger="click"
      open={opened}
      onOpenChange={(open) => setOpened(open)}
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {Object.values(actions).map((action) => {
            if (action.show) {
              return (
                <Button
                  type="text"
                  icon={action.icon}
                  onClick={onClick(action.onClick)}
                >
                  {action.label}
                </Button>
              );
            }
          })}
        </div>
      }
    >
      <Button type="text" icon={<MenuOutlined />} />
    </Popover>
  );
};
