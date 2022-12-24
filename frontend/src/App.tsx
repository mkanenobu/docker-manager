import { RecoilRoot } from "recoil";
import { useRouter } from "~/hooks/router-hooks";
import { ContainerPage } from "~/pages/Container";
import { AppContainer } from "./components/Layout/AppContainer";
import { ContainersPage } from "./pages/Containers";
import { ImagesPage } from "./pages/Images";

const Router = () => {
  const { route } = useRouter();

  if (route === "containers") {
    return <ContainersPage />;
  } else if (route === "images") {
    return <ImagesPage />;
  } else if (route.split(":").at(0) === "container") {
    return <ContainerPage id={route.split(":").at(1) ?? ""} />;
  } else {
    return <div>404</div>;
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
