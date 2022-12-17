import { Spin } from "antd";

export const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        background: "rgba(100, 100, 100, 0.8)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          transform: "scale(1.2)",
          padding: "8px",
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    </div>
  );
};
