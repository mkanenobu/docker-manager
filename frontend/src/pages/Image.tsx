import { Typography } from "antd";
import { type FC } from "react";
import { Image } from "~/components/image/Image";

type ImagePageProps = {
  id: string;
};

export const ImagePage: FC<ImagePageProps> = ({ id }) => {
  return (
    <>
      <Typography.Title>Image</Typography.Title>
      <Image id={id} />
    </>
  );
};
