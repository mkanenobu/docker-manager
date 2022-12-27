import { Layout, Spin } from "antd";
import { Suspense, type FC, type ReactNode } from "react";
import { SideMenu } from "~/components/Layout/SideMenu";
import { LoadingOverlay } from "~/components/LoadingOverlay";
import { useLoadingOverlay } from "~/hooks/loading-overlay";
import styles from "./AppContainer.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { overlayState } = useLoadingOverlay();

  return (
    <Layout id="app">
      <SideMenu />
      <Layout.Content className={styles.content}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {overlayState && <LoadingOverlay />}
      </Layout.Content>
    </Layout>
  );
};
