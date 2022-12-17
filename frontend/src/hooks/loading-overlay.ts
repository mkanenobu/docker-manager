import { atom, useRecoilState } from "recoil";

const loadingOverlayState = atom({
  key: "loadingOverlay",
  default: false,
});

export const useLoadingOverlay = () => {
  const [overlayState, setLoadingOverlay] = useRecoilState(loadingOverlayState);

  const showLoadingOverlay = () => {
    setLoadingOverlay(true);
  };

  const hideLoadingOverlay = () => {
    setLoadingOverlay(false);
  };

  return { overlayState, showLoadingOverlay, hideLoadingOverlay };
};
