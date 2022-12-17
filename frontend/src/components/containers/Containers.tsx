import { Table, Tag, Typography } from "antd";
import { type FC } from "react";
import { unixToHuman } from "~/helpers/date-helper";
import { capitalize } from "~/helpers/string-helper";
import type { Status } from "~/models/container";
import { colors } from "~/theme/colors";
import { type WailsTypes } from "~/wails";

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
  containers: WailsTypes.docker.Container[];
}> = ({ containers }) => {
  return (
    <Table
      pagination={false}
      rowKey="Id"
      dataSource={containers}
      columns={[
        {
          title: "Names",
          dataIndex: "Names",
          key: "Names",
          render: (names: string[]) => names.join(" | "),
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
          title: "Command",
          dataIndex: "Command",
          key: "Command",
          render: (command: string) => (
            <Typography.Text code>{command}</Typography.Text>
          ),
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
