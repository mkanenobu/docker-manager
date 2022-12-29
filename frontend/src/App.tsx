import { ConfigProvider, Empty } from "antd";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { useRouter, useRoutingKeyboardShortcuts } from "~/hooks/router-hooks";
import { ContainerPage } from "~/pages/Container";
import { ImagePage } from "~/pages/Image";
import { SettingsPage } from "~/pages/Settings";
import { AppContainer } from "./components/Layout/AppContainer";
import { ContainersPage } from "./pages/Containers";
import { ImagesPage } from "./pages/Images";

const Router = () => {
  const { route } = useRouter();
  useRoutingKeyboardShortcuts();

  if (route === "containers") {
    return <ContainersPage />;
  } else if (route === "images") {
    return <ImagesPage />;
  } else if (route.split("/").at(0) === "container") {
    return <ContainerPage id={route.split("/").at(1) ?? ""} />;
  } else if (route.split("/").at(0) === "image") {
    return <ImagePage id={route.split("/").at(1) ?? ""} />;
  } else if (route === "settings") {
    return <SettingsPage />;
  } else {
    return (
      <div>
        <Empty />
      </div>
    );
  }
};

export const App = () => {
  return (
    <RecoilRoot>
      <ConfigProvider theme={{ token: { fontFamily: "" } }}>
        <SWRConfig value={{ revalidateOnFocus: true, suspense: true }}>
          <AppContainer>
            <Router />
          </AppContainer>
        </SWRConfig>
      </ConfigProvider>
    </RecoilRoot>
  );
};
