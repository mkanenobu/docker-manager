import {
  CloudOutlined,
  DatabaseOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, type MenuProps } from "antd";
import { useState, type FC } from "react";
import { useRouter, type Route } from "~/hooks/router-hooks";
import styles from "./SideMenu.module.css";

type MenuItem = Required<MenuProps>["items"][number];
const menuItems: MenuItem[] = [
  { label: "Containers", icon: <DatabaseOutlined />, key: "containers" },
  { label: "Images", icon: <CloudOutlined />, key: "images" },
  { label: "Settings", icon: <SettingOutlined />, key: "settings" },
];

export const SideMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <Layout.Sider theme="light" collapsed={collapsed}>
      <div className={styles.menu}>
        <Menu
          selectedKeys={[router.route]}
          items={menuItems}
          mode="inline"
          onSelect={({ key }) => {
            router.push(key as Route);
          }}
        />
        <Button onClick={toggleCollapsed} style={{ margin: "8px" }}>
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </div>
    </Layout.Sider>
  );
};
