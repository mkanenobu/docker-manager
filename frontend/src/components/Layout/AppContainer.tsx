import { Layout, Spin } from "antd";
import { Suspense, type FC, type ReactNode } from "react";
import { SideMenu } from "~/components/Layout/SideMenu";
import { LoadingOverlay } from "~/components/LoadingOverlay";
import { useLoadingOverlay } from "~/hooks/loading-overlay";

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
  const { overlayState } = useLoadingOverlay();

  return (
    <Layout id="app">
      <SideMenu />
      <Layout.Content style={{ padding: "16px", overflow: "scroll" }}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {overlayState && <LoadingOverlay />}
      </Layout.Content>
    </Layout>
  );
};
