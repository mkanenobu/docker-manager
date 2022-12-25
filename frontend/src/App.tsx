import { Empty } from "antd";
import { RecoilRoot } from "recoil";
import { useRouter, useRoutingKeyboardShortcuts } from "~/hooks/router-hooks";
import { ContainerPage } from "~/pages/Container";
import { ImagePage } from "~/pages/Image";
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
      <AppContainer>
        <Router />
      </AppContainer>
    </RecoilRoot>
  );
};
