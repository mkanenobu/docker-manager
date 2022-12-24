import { Typography } from "antd";
import { type FC } from "react";
import { Container } from "~/components/container/Container";

type ContainerPageProps = {
  id: string;
};

export const ContainerPage: FC<ContainerPageProps> = ({ id }) => {
  return (
    <>
      <Typography.Title>Container</Typography.Title>
      <Container id={id} />
    </>
  );
};
