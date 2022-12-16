import { AppContainer } from "./components/AppContainer";
import { ContainersPage } from "./pages/Containers";
import { ImagesPage } from "./pages/Images";
import { RouterContext, useRouter, useRouterValue } from "./hooks/router-hooks";

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
  const router = useRouterValue();

  return (
    <AppContainer>
      <RouterContext.Provider value={router}>
        <Router />
      </RouterContext.Provider>
    </AppContainer>
  );
};
