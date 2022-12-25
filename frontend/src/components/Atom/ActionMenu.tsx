import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { type FC } from "react";

export type MenuAction = NonNullable<MenuProps["items"]>[number];
export const ActionMenu: FC<{
  items: MenuProps["items"];
}> = ({ items }) => {
  return (
    <Dropdown menu={{ items }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};
