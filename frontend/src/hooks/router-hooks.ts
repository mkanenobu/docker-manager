import { createContext, useContext, useState } from "react";

export type Route = "containers";

type Router = {
  route: Route;
  push: (route: Route) => void;
  back: () => void;
};

// @ts-expect-error
export const RouterContext = createContext<Router>(null);

export const useRouterValue = (): Router => {
  const [route, setRoute] = useState<Route>("containers");
  const [history, setHistory] = useState<Route[]>([]);

  const push = (r: Route) => {
    setHistory((p) => [...p, r]);
    setRoute(r);
  };

  const back = () => {
    setHistory((p) => p.slice(0, p.length - 1));
    setRoute(history.at(-1) ?? "containers");
  };

  return {
    route,
    push,
    back,
  };
};

export const useRouter = () => useContext(RouterContext);
