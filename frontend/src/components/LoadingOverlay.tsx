import { Spin } from "antd";
import { Overlay } from "~/components/Atom/Overlay";
import styles from "./LoadingOverlay.module.css";

export const LoadingOverlay = () => {
  return (
    <Overlay>
      <div className={styles.iconBack}>
        <Spin tip="Loading..." size="large" />
      </div>
    </Overlay>
  );
};
