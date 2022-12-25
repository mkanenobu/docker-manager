import { Table, Tag, Typography } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { ContainerStatusTag } from "~/components/Atom/ContainerStatusTag";
import { ContainerActionMenu } from "~/components/containers/ContainerActionMenu";
import { durationHelper, formatUnixTime } from "~/helpers/date-helper";
import { shortenSha256Hash } from "~/helpers/string-helper";
import { useRouter } from "~/hooks/router-hooks";
import {
  ContainerEvent,
  useSubscribeContainerEvents,
} from "~/hooks/subscribe-container-events";
import { useToast } from "~/hooks/toast-hooks";
import type { ContainerState } from "~/models/container";
import { colors } from "~/theme/colors";
import { wails, type WailsTypes } from "~/wails";
import styles from "./Containers.module.css";

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
      default:
        return null;
    }
  })();

  return (
    operation &&
    `Container ${shortenSha256Hash(
      e.id
    )} has been ${operation}.\n${formatUnixTime(e.time)}`
  );
};

export const Containers: FC = () => {
  const router = useRouter();
  const { showSuccessToast } = useToast();

  const { data: containers, mutate } = useSWR("containers", wails.ContainerPs, {
    refreshInterval: durationHelper({ seconds: 30 }).asMilliseconds(),
  });
  const revalidateContainers = () => mutate(containers);

  useSubscribeContainerEvents((e) => {
    const msg = notifyMessage(e);
    msg && showSuccessToast(msg);

    // There is a time lag before their status is reflected
    setTimeout(() => {
      revalidateContainers();
    }, durationHelper({ seconds: 0.3 }).asMilliseconds());
  });

  return (
    <Table
      pagination={false}
      rowKey="Id"
      dataSource={containers}
      rowClassName={styles.row}
      onRow={(record) => ({
        onClick: () => router.push(`container:${record.Id}`),
      })}
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
          render: (ports: WailsTypes.types.Port[] | undefined) => (
            <div>
              {ports &&
                dedupe(ports.map((port) => formatPort(port))).map((port) => {
                  return port && <Tag key={port}>{port}</Tag>;
                })}
            </div>
          ),
        },
        {
          title: "State",
          dataIndex: "State",
          key: "State",
          render: (state: ContainerState) => <ContainerStatusTag state={state} />,
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
            <Typography.Text>{formatUnixTime(created)}</Typography.Text>
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
          onCell: () => {
            return {
              onClick: (e) => e.stopPropagation(),
            };
          },
        },
      ]}
    />
  );
};
