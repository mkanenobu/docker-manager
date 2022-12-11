import { type FC } from "react";
import type { docker } from "../../wailsjs/go/models";
import dayjs from "dayjs";
import { Table, Code, Badge, Text, Button, useToasts } from "@geist-ui/core";
import { colors } from "../theme/colors";
import { capitalize } from "../helpers/string-helper";
import { DockerActionMenu } from "./DockerActionMenu";
import type { Status } from "../models/container";

const statusColor = (status: Status) => {
  switch (status) {
    case "running":
      return colors.green;
    case "paused":
      return colors.orange;
    default:
      return colors.textColor;
  }
};

export const DockerContainers: FC<{
  containers: docker.Container[];
}> = ({ containers }) => {
  return (
    <Table data={containers}>
      <Table.Column
        prop="Names"
        label="Names"
        render={(value) => value.join(" | ")}
      />
      <Table.Column
        prop="State"
        label="State"
        render={(value) => {
          const status = value as Status;
          return (
            <Badge style={{ backgroundColor: statusColor(value) }}>
              {capitalize(status)}
            </Badge>
          );
        }}
      />
      <Table.Column prop="Status" label="Status" />
      <Table.Column
        prop="Command"
        label="Command"
        render={(value) => <Code>{value}</Code>}
      />
      <Table.Column
        prop="Created"
        label="Created"
        render={(value) => (
          <Text>{dayjs(value * 1000).format("YYYY/MM/DD HH:mm:ss")}</Text>
        )}
      />
      <Table.Column
        prop="Id"
        label="Actions"
        render={(id, _item, i) => (
          <div>
            <DockerActionMenu containerId={id} status={containers[i].Status} />
          </div>
        )}
      />
    </Table>
  );
};
