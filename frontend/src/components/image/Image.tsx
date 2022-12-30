import { Card, Collapse, Descriptions, Divider, Empty, Typography } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { wails } from "~/wails";
import styles from "./Image.module.css";

const ImageDescription: FC<{
  image: Awaited<ReturnType<typeof wails.ImageInspect>>;
}> = ({ image }) => {
  return (
    <Descriptions bordered size="middle" column={2}>
      <Descriptions.Item label="Tags" span={2}>
        {image.RepoTags.map((tag) => (
          <Typography.Text code>{tag}</Typography.Text>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label="Architecture">
        {image.Architecture}
      </Descriptions.Item>
      <Descriptions.Item label="OS">{image.Os}</Descriptions.Item>
    </Descriptions>
  );
};

export const Image: FC<{ id: string }> = ({ id }) => {
  const { data: image } = useSWR(`image/${id}`, () => wails.ImageInspect(id));

  return (
    <Card
      title={
        <Typography.Paragraph>
          ID: <Typography.Text copyable>{id}</Typography.Text>
        </Typography.Paragraph>
      }
    >
      {!image ? (
        <Empty />
      ) : (
        <>
          <ImageDescription image={image} />
          <Divider />
          <Collapse>
            <Collapse.Panel header="Raw JSON" key={"1"}>
              <div className={styles.rawJson}>
                {JSON.stringify(image, undefined, 2)}
              </div>
            </Collapse.Panel>
          </Collapse>
        </>
      )}
    </Card>
  );
};
