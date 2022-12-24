import { Table, Typography } from "antd";
import useSWR from "swr";
import { ImageActionMenu } from "~/components/images/ImageActionMenu";
import { convertByteToHumanReadable } from "~/helpers/data-size-helper";
import { durationHelper, formatUnixTime } from "~/helpers/date-helper";
import { shortenSha256Hash } from "~/helpers/string-helper";
import {
  ImageEvent,
  useSubscribeImageEvents,
} from "~/hooks/subscribe-image-events";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

const sizeFormatter = (num: number): string =>
  new Intl.NumberFormat(undefined, {
    style: "decimal",
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 2,
  }).format(num);

const notifyMessage = (e: ImageEvent) => {
  const operation: string | null = (() => {
    switch (e.Action) {
      case "delete":
        return "deleted";
      default:
        return null;
    }
  })();

  return (
    operation &&
    `Image ${shortenSha256Hash(e.id)} has been ${operation}.\n${formatUnixTime(
      e.time
    )}`
  );
};

export const Images = () => {
  const { showSuccessToast } = useToast();

  const { data, mutate } = useSWR("images", wails.ImageLs, {
    refreshInterval: durationHelper({ seconds: 3 }).asMilliseconds(),
  });
  const revalidateImages = () => mutate(data);

  useSubscribeImageEvents((e) => {
    const msg = notifyMessage(e);
    msg && showSuccessToast(msg);

    // There is a time lag before their status is reflected
    setTimeout(() => {
      revalidateImages();
    }, durationHelper({ seconds: 0.3 }).asMilliseconds());
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
            <Typography.Text>{formatUnixTime(created)}</Typography.Text>
          ),
        },
        {
          title: "Action",
          dataIndex: "Action",
          key: "Action",
          render: (_, record) => {
            return <ImageActionMenu imageId={record.Id} />;
          },
        },
      ]}
    />
  );
};
