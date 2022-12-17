import { Table, Typography } from "antd";
import useSWR from "swr";
import { convertByteToHumanReadable } from "~/helpers/data-size-helper";
import { unixToHuman } from "~/helpers/date-helper";
import { wails } from "~/wails";

const extractTag = (tag: string) => tag.split(":").at(-1);
const extractRepository = (tag: string) => tag.split(":").at(0);

const formatData = (data: Awaited<ReturnType<typeof wails.ImageLs>>) => {
  return data.map((image) => {
    return {
      ...image,
      ImageId: image.Id.split(":").at(-1)?.slice(0, 11),
      Repository: image.RepoTags.map(extractRepository).join(" | "),
      Tag: image.RepoTags.map(extractTag).join(" | "),
    };
  });
};

const sizeFormatter = (num: number): string => {
  const format = new Intl.NumberFormat(undefined, {
    style: "decimal",
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 2,
  });
  return format.format(num);
};

export const ImagesPage = () => {
  const { data } = useSWR("docker-images", wails.ImageLs, {
    refreshInterval: 1000,
  });

  return (
    <>
      <Typography.Title>Images</Typography.Title>
      <Table
        pagination={false}
        rowKey="ImageId"
        dataSource={formatData(data ?? [])}
        columns={[
          {
            title: "ID",
            dataIndex: "ImageId",
            key: "ImageId",
          },
          {
            title: "Repository",
            dataIndex: "Repository",
            key: "Repository",
            render: (repo: string) => (
              <Typography.Text code>{repo}</Typography.Text>
            ),
          },
          {
            title: "Tag",
            dataIndex: "Tag",
            key: "Tag",
          },
          {
            title: "Size",
            dataIndex: "Size",
            key: "Size",
            render: (size: number) => {
              const { value, unit } = convertByteToHumanReadable(size);
              return (
                <Typography.Text>
                  {sizeFormatter(value)}
                  {unit}
                </Typography.Text>
              );
            },
          },
          {
            title: "Created",
            dataIndex: "Created",
            key: "Created",
            render: (created: number) => (
              <Typography.Text>{unixToHuman(created)}</Typography.Text>
            ),
          },
        ]}
      />
    </>
  );
};
