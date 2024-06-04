import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import type { MenuItemType } from "antd/lib/menu/interface";
import { type FC } from "react";

export type MenuAction = MenuItemType;

export const ActionMenu: FC<{
  items: MenuProps["items"];
}> = ({ items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};
