import { Tag } from "antd";
import { type FC } from "react";
import { capitalize } from "~/helpers/string-helper";
import type { ContainerState } from "~/models/container";
import { colors } from "~/theme/colors";

const colorByState = (state: ContainerState) => {
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

export const ContainerStatusTag: FC<{ state: ContainerState }> = ({
  state,
}) => {
  return <Tag color={colorByState(state)}>{capitalize(state)}</Tag>;
};
