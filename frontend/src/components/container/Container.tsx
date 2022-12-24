import { Card } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { wails } from "~/wails";

export const Container: FC<{ id: string }> = ({ id }) => {
  const { data: container } = useSWR("container", () =>
    wails.ContainerInspect(id)
  );

  return (
    <Card style={{ fontFamily: "monospace" }}>
      {JSON.stringify(container, undefined, 2)}
    </Card>
  );
};
