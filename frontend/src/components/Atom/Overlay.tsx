import type { FC, PropsWithChildren } from "react";
import styles from "./Overlay.module.css";

export const Overlay: FC<PropsWithChildren<{ onClick?: () => void }>> = ({
  children,
  onClick,
}) => (
  <div
    className={styles.container}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    {children}
  </div>
);
