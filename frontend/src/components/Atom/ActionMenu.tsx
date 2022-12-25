import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import type { ItemType } from "antd/lib/menu/hooks/useItems";
import { type FC } from "react";

export type MenuAction = ItemType;

export const ActionMenu: FC<{
  items: MenuProps["items"];
}> = ({ items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};
