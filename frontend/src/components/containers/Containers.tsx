import { Table, Tag, Typography } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { ContainerActionMenu } from "~/components/containers/ContainerActionMenu";
import { unixToHuman } from "~/helpers/date-helper";
import { capitalize } from "~/helpers/string-helper";
import type { ContainerState } from "~/models/container";
import { colors } from "~/theme/colors";
import { wails, type WailsTypes } from "~/wails";

const dedupe = <T extends any = any>(arr: T[]): T[] => Array.from(new Set(arr));

const stateColor = (state: ContainerState) => {
  switch (state) {
    case "running":
    case "created":
      return colors.green;
    case "restarting":
      return colors.blue;
    case "paused":
    case "removing":
      return colors.orange;
    case "dead":
      return colors.red;
    default:
      return colors.black;
  }
};

export const Containers: FC = () => {
  const { data: containers, mutate } = useSWR(
    "docker-containers",
    wails.ContainerPs,
    {
      refreshInterval: 3000,
    }
  );
  const revalidateContainers = () =>
    mutate(undefined, { optimisticData: containers });

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
        // {
        //   title: "Command",
        //   dataIndex: "Command",
        //   key: "Command",
        //   render: (command: string) => (
        //     <Typography.Text code>{command}</Typography.Text>
        //   ),
        // },
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
            <Tag color={stateColor(state as ContainerState)}>
              {capitalize(state)}
            </Tag>
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
        {
          title: "Action",
          dataIndex: "Action",
          key: "Action",
          render: (_, record) => {
            return (
              <ContainerActionMenu
                containerId={record.Id}
                state={record.State as ContainerState}
                revalidateContainers={revalidateContainers}
              />
            );
          },
        },
      ]}
    />
  );
};
