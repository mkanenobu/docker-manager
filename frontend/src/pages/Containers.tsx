import { DockerContainers } from "../components/DockerContainers";
import { Text } from "@geist-ui/core";
import useSWR from "swr";
import { wails } from "../models/wails";

export const ContainersPage = () => {
  const { data } = useSWR("docker-containers", wails.ContainerPs, {
    refreshInterval: 1000,
  });

  return (
    <>
      <Text h1>Containers</Text>
      <DockerContainers containers={data ?? []} />
    </>
  );
};
