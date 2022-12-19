import { MoreOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { Fragment, type FC, type ReactElement } from "react";

export type MenuAction = {
  key: string;
  label: string;
  icon: ReactElement;
  onClick: () => void;
};

export const ActionMenu: FC<{
  opened: boolean;
  setOpened: (open: boolean) => void;
  actions: MenuAction[];
}> = ({ opened, setOpened, actions }) => {
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
          {actions.map((action) => (
            <Fragment key={action.key}>
              <Button
                type="text"
                icon={action.icon}
                style={{ width: "100%", textAlign: "left" }}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            </Fragment>
          ))}
        </div>
      }
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Popover>
  );
};
