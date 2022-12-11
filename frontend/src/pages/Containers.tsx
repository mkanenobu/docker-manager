import { DockerContainers } from "../components/DockerContainers";
import { Text } from "@geist-ui/core";
import useSWR from "swr";
import { DockerPs } from "../../wailsjs/go/main/App";

export const ContainersPage = () => {
  const { data } = useSWR("docker-ps", DockerPs, { refreshInterval: 1000 });

  return (
    <>
      <Text h1>Containers</Text>
      <DockerContainers containers={data ?? []} />
    </>
  );
};
