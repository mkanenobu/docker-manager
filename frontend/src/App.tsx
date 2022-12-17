import { RecoilRoot } from "recoil";
import { useRouter } from "~/hooks/router-hooks";
import { AppContainer } from "./components/Layout/AppContainer";
import { ContainersPage } from "./pages/Containers";
import { ImagesPage } from "./pages/Images";

const Router = () => {
  const router = useRouter();

  switch (router.route) {
    case "containers": {
      return <ContainersPage />;
    }
    case "images": {
      return <ImagesPage />;
    }
    default: {
      return <div>404</div>;
    }
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
