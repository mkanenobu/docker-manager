import { type FC, type ReactNode, useState } from "react";
import { Button, Popover, Text } from "@geist-ui/core";

type MenuProps = {
  content: Array<{
    label: ReactNode;
    onClick: () => void;
  }>;
  children: ReactNode;
};

export const Menu: FC<MenuProps> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      onVisibleChange={(visible) => setVisible(visible)}
      visible={visible}
      content={() => (
        <div
          style={{
            padding: "0 10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.content.map((content) => (
            <Popover.Item
              style={{ height: "2rem" }}
              onClick={() => {
                content.onClick();
                setVisible(false);
              }}
            >
              {content.label}
            </Popover.Item>
          ))}
        </div>
      )}
    >
      {props.children}
    </Popover>
  );
};
