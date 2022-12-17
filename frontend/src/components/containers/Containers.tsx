import { Table, Tag, Typography } from "antd";
import { type FC } from "react";
import { unixToHuman } from "~/helpers/date-helper";
import { capitalize } from "~/helpers/string-helper";
import type { Status } from "~/models/container";
import { colors } from "~/theme/colors";
import { type WailsTypes } from "~/wails";

const dedupe = <T extends any = any>(arr: T[]): T[] => Array.from(new Set(arr));

const stateColor = (status: Status) => {
  switch (status) {
    case "running":
      return colors.green;
    case "paused":
      return colors.orange;
    default:
      return colors.textColor;
  }
};

export const Containers: FC<{
  containers: WailsTypes.container.Container[];
}> = ({ containers }) => {
  return (
    <Table
      pagination={false}
      rowKey="Id"
      dataSource={containers}
      columns={[
        {
          title: "ID",
          dataIndex: "Id",
          key: "Id",
          render: (id: string) => id.slice(0, 11),
        },
        {
          title: "Names",
          dataIndex: "Names",
          key: "Names",
          render: (names: string[]) => (
            <div>
              {names.map((name) => (
                <Typography.Text key={name}>{name}</Typography.Text>
              ))}
            </div>
          ),
        },
        {
          title: "Command",
          dataIndex: "Command",
          key: "Command",
          render: (command: string) => (
            <Typography.Text code>{command}</Typography.Text>
          ),
        },
        {
          title: "Ports",
          dataIndex: "Ports",
          key: "Ports",
          render: (ports: WailsTypes.types.Port[]) => (
            <div>
              {dedupe(
                ports.map((port) => `${port.PublicPort}:${port.PrivatePort}`)
              ).map((port) => (
                <Tag>{port}</Tag>
              ))}
            </div>
          ),
        },
        {
          title: "State",
          dataIndex: "State",
          key: "State",
          render: (state: string) => (
            <Tag color={stateColor(state)}>{capitalize(state)}</Tag>
          ),
        },
        {
          title: "Status",
          dataIndex: "Status",
          key: "Status",
        },
        {
          title: "Created",
          dataIndex: "Created",
          key: "Created",
          render: (created: number) => (
            <Typography.Text>{unixToHuman(created)}</Typography.Text>
          ),
        },
      ]}
    />
  );
};
