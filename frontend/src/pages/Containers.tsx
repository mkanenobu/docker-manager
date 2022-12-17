import { Typography } from "antd";
import useSWR from "swr";
import { Containers } from "~/components/containers/Containers";
import { wails } from "~/wails";

export const ContainersPage = () => {
  const { data } = useSWR("docker-containers", wails.ContainerPs, {
    refreshInterval: 1000,
  });

  return (
    <>
      <Typography.Title>Containers</Typography.Title>
      <Containers containers={data ?? []} />
    </>
  );
};
