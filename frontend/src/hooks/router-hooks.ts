import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export type Route =
  | "containers"
  | `container/${string}`
  | "images"
  | `image/${string}`
  | "settings";

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

export const useRoutingKeyboardShortcuts = () => {
  const { push, back } = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState("Alt")) {
        if (e.key === "ArrowLeft") {
          back();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [push, back]);
};
