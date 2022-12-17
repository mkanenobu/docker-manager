import {
  BorderOutlined,
  CaretRightOutlined,
  CodeOutlined,
  DeleteOutlined,
  MenuOutlined,
  PauseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
import { Fragment, ReactElement, useState, type FC } from "react";
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

  const actions: Record<
    string,
    {
      label: string;
      icon: ReactElement;
      onClick: () => Promise<unknown>;
      show: boolean;
      noNeedToRevalidate?: boolean;
    }
  > = {
    exec: {
      label: "Copy exec command",
      icon: <CodeOutlined />,
      onClick: () =>
        copyToClipboard(`docker exec -it ${containerId.slice(0, 11)} `),
      show: state === "running",
      noNeedToRevalidate: true,
    },
    start: {
      label: "Start",
      icon: <CaretRightOutlined />,
      onClick: () => startContainer(containerId),
      show: state === "exited",
    },
    restart: {
      label: "Restart",
      icon: <SyncOutlined />,
      onClick: () => restartContainer(containerId),
      show: state === "running",
    },
    stop: {
      label: "Stop",
      icon: <BorderOutlined />,
      onClick: () => stopContainer(containerId),
      show: !["exited", "removing", "dead"].includes(state),
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
    remove: {
      label: "Remove",
      icon: <DeleteOutlined />,
      onClick: () => removeContainer(containerId),
      show: true,
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
          {Object.entries(actions).map(([key, action]) => (
            <Fragment key={key}>
              {action.show && (
                <Button
                  type="text"
                  icon={action.icon}
                  style={{ width: "100%", textAlign: "left" }}
                  onClick={onClick(action.onClick, !!action.noNeedToRevalidate)}
                >
                  {action.label}
                </Button>
              )}
            </Fragment>
          ))}
        </div>
      }
    >
      <Button type="text" icon={<MenuOutlined />} />
    </Popover>
  );
};
