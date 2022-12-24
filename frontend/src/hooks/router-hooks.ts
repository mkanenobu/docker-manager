import { atom, useRecoilState } from "recoil";

export type Route = "containers" | `container:${string}` | "images";

type Router = {
  route: Route;
  push: (route: Route) => void;
  back: () => void;
};

const initialRoute: Route = "containers";

const historyState = atom<Route[]>({
  key: "history",
  default: [],
});

export const useRouter = (): Router => {
  const [history, setHistory] = useRecoilState(historyState);

  const push = (r: Route) => {
    setHistory((p) => [...p, r]);
  };

  const back = () => {
    setHistory((p) => p.slice(0, p.length - 1));
  };

  const route = history.at(-1) || initialRoute;

  return {
    route,
    push,
    back,
  };
};
