import { atom, useRecoilState } from "recoil";

export type Route = "containers" | "images";

type Router = {
  route: Route;
  push: (route: Route) => void;
  back: () => void;
};

const initialRoute: Route = "images";

const routeState = atom<Route>({
  key: "route",
  default: initialRoute,
});
const historyState = atom<Route[]>({
  key: "history",
  default: [],
});

export const useRouter = (): Router => {
  const [route, setRoute] = useRecoilState(routeState);
  const [history, setHistory] = useRecoilState(historyState);

  const push = (r: Route) => {
    console.log("push", r);
    setHistory((p) => [...p, r]);
    setRoute(r);
  };

  const back = () => {
    console.log("back");
    setHistory((p) => p.slice(0, p.length - 1));
    setRoute(history.at(-1) ?? initialRoute);
  };

  return {
    route,
    push,
    back,
  };
};
