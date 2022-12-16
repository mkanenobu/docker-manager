import { createContext, useContext, useState } from "react";

export type Route = "containers" | "images";

type Router = {
  route: Route;
  push: (route: Route) => void;
  back: () => void;
};

// @ts-expect-error
export const RouterContext = createContext<Router>(null);

const initialRoute: Route = "images";

export const useRouterValue = (): Router => {
  const [route, setRoute] = useState<Route>(initialRoute);
  const [history, setHistory] = useState<Route[]>([]);

  const push = (r: Route) => {
    setHistory((p) => [...p, r]);
    setRoute(r);
  };

  const back = () => {
    setHistory((p) => p.slice(0, p.length - 1));
    setRoute(history.at(-1) ?? initialRoute);
  };

  return {
    route,
    push,
    back,
  };
};

export const useRouter = () => useContext(RouterContext);
