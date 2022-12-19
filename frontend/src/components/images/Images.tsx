import { Table, Typography } from "antd";
import useSWR from "swr";
import { convertByteToHumanReadable } from "~/helpers/data-size-helper";
import { unixToHuman } from "~/helpers/date-helper";
import { shortenSha256Hash } from "~/helpers/string-helper";
import { wails } from "~/wails";

const sizeFormatter = (num: number): string => {
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 2,
  }).format(num);
};

export const Images = () => {
  const { data } = useSWR("docker-images", () => wails.ImageLs(), {
    refreshInterval: 3000,
  });

  return (
    <Table
      pagination={false}
      rowKey="Id"
      dataSource={data}
      columns={[
        {
          title: "ID",
          dataIndex: "Id",
          key: "Id",
          render: (id: string) => shortenSha256Hash(id),
        },
        {
          title: "Repository",
          dataIndex: "RepoTags",
          key: "RepoTags",
          render: (tags: string[], record) => {
            return (
              <div>
                {tags?.map((tag, i) => (
                  <Typography.Text key={`${record.Id}-${tag}-${i}`} code>
                    {tag}
                  </Typography.Text>
                ))}
              </div>
            );
          },
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
  );
};
