import {
  CloudOutlined,
  DatabaseOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, type MenuProps } from "antd";
import { useState, type FC } from "react";
import { useRouter, type Route } from "~/hooks/router-hooks";

type MenuItem = Required<MenuProps>["items"][number];
const menuItems: MenuItem[] = [
  { label: "Containers", icon: <DatabaseOutlined />, key: "containers" },
  { label: "Images", icon: <CloudOutlined />, key: "images" },
];

export const SideMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <Layout.Sider theme="light" collapsed={collapsed}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
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
