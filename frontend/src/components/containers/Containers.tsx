import { Table, Tag, Typography } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { ContainerActionMenu } from "~/components/containers/ContainerActionMenu";
import { durationHelper, unixToHuman } from "~/helpers/date-helper";
import { capitalize, shortenSha256Hash } from "~/helpers/string-helper";
import {
  ContainerEvent,
  useSubscribeContainerEvents,
} from "~/hooks/subscribe-container-events";
import { useToast } from "~/hooks/toast-hooks";
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

const formatPort = (port: WailsTypes.types.Port) => {
  if (port.PublicPort && port.PrivatePort) {
    return `${port.PublicPort}:${port.PrivatePort}`;
  }
  return port.PublicPort;
};

const notifyMessage = (e: ContainerEvent) => {
  const operation: string | null = (() => {
    switch (e.Action) {
      case "start":
        return "started";
      case "pause":
        return "paused";
      case "unpause":
        return "unpaused";
      case "stop":
        return "stopped";
      case "destroy":
        return "removed";
      case "die":
      case "kill":
      case "create":
        return null;
    }
  })();

  return operation && `Container ${shortenSha256Hash(e.id)} ${operation}`;
};

export const Containers: FC = () => {
  const { showSuccessToast } = useToast();

  const { data: containers, mutate } = useSWR(
    "docker-containers",
    wails.ContainerPs,
    {
      refreshInterval: durationHelper({ seconds: 30 }).asMilliseconds(),
    }
  );
  const revalidateContainers = () => mutate(containers);

  useSubscribeContainerEvents((e) => {
    revalidateContainers();
    const msg = notifyMessage(e);
    msg && showSuccessToast(msg);
  });

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
          render: (id: string) => shortenSha256Hash(id),
        },
        {
          title: "Names",
          dataIndex: "Names",
          key: "Names",
          render: (names: string[]) => (
            <div>
              {names.map((name) => (
                <Typography.Text code key={name}>
                  {name}
                </Typography.Text>
              ))}
            </div>
          ),
        },
        {
          title: "Ports",
          dataIndex: "Ports",
          key: "Ports",
          render: (ports: WailsTypes.types.Port[]) => (
            <div>
              {dedupe(ports.map((port) => formatPort(port))).map((port) => {
                return port && <Tag key={port}>{port}</Tag>;
              })}
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
              />
            );
          },
        },
      ]}
    />
  );
};
