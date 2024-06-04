import { Card, Collapse, Descriptions, Divider, Empty, Typography } from "antd";
import dayjs from "dayjs";
import { type FC } from "react";
import useSWR from "swr";
import { defaultDateTimeFormat } from "~/helpers/date-helper";
import { shortenSha256Hash } from "~/helpers/string-helper";
import { wails } from "~/wails";
import styles from "./Container.module.css";

const formatObjectDateTimeField = (obj: Record<string, any>) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.match(/At$/g)) {
      obj[key] = dayjs(value).format(defaultDateTimeFormat);
    }
  }
  return obj;
};

const ContainerDescription: FC<{
  container: Awaited<ReturnType<typeof wails.ContainerInspect>>;
}> = ({ container }) => {
  return (
    <Descriptions bordered size="middle" column={2}>
      <Descriptions.Item label="Name">{container.Name}</Descriptions.Item>
      <Descriptions.Item label="Created">
        {dayjs(container.Created).format(defaultDateTimeFormat)}
      </Descriptions.Item>
      <Descriptions.Item label="Path">{container.Path}</Descriptions.Item>
      <Descriptions.Item label="Args">
        {JSON.stringify(container.Args, undefined)}
      </Descriptions.Item>
      <Descriptions.Item label="State" span={2}>
        <Typography.Text>
          {JSON.stringify(
            formatObjectDateTimeField(container.State),
            undefined,
            2,
          )}
        </Typography.Text>
      </Descriptions.Item>
      <Descriptions.Item label="Image">
        {/* TODO: Linkify */}
        {shortenSha256Hash(container.Image)}
      </Descriptions.Item>
      <Descriptions.Item label="Platform">
        {container.Platform}
      </Descriptions.Item>
      <Descriptions.Item label="PortBindings">
        {/* @ts-expect-error */}
        {container.HostConfig?.PortBindings &&
          /* @ts-expect-error */
          JSON.stringify(container.HostConfig?.PortBindings, undefined, 2)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export const Container: FC<{ id: string }> = ({ id }) => {
  const { data: container } = useSWR(`container/${id}`, () =>
    wails.ContainerInspect(id),
  );

  return (
    <Card
      title={
        <Typography.Paragraph>
          ID: <Typography.Text copyable>{id}</Typography.Text>
        </Typography.Paragraph>
      }
    >
      {!container ? (
        <Empty />
      ) : (
        <>
          <ContainerDescription container={container} />
          <Divider />
          <Collapse>
            <Collapse.Panel header="Raw JSON" key={"1"}>
              <div className={styles.rawJson}>
                {JSON.stringify(container, undefined, 2)}
              </div>
            </Collapse.Panel>
          </Collapse>
        </>
      )}
    </Card>
  );
};
