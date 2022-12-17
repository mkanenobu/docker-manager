import { ConfigProvider, Layout, Spin } from "antd";
import { Suspense, type FC, type ReactNode } from "react";
import { SWRConfig } from "swr";
import { SideMenu } from "~/components/Layout/SideMenu";

const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider>
      <SWRConfig value={{ revalidateOnFocus: true, suspense: true }}>
        <Layout id="app">
          <SideMenu />
          <Layout.Content style={{ padding: "8px" }}>
            <Suspense fallback={<Spin tip="Loading..." />}>{children}</Suspense>
          </Layout.Content>
        </Layout>
      </SWRConfig>
    </ConfigProvider>
  );
};
