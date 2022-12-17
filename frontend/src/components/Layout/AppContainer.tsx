import { ConfigProvider, Layout } from "antd";
import { type FC, type ReactNode } from "react";
import { SWRConfig } from "swr";
import { SideMenu } from "~/components/Layout/SideMenu";
import { LoadingOverlay } from "~/components/LoadingOverlay";
import { useLoadingOverlay } from "~/hooks/loading-overlay";

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { overlayState } = useLoadingOverlay();

  return (
    <ConfigProvider>
      <SWRConfig value={{ revalidateOnFocus: true }}>
        <Layout id="app">
          <SideMenu />
          <Layout.Content style={{ padding: "16px" }}>
            {children}
            {overlayState && <LoadingOverlay />}
          </Layout.Content>
        </Layout>
      </SWRConfig>
    </ConfigProvider>
  );
};
