import { Table, Typography } from "antd";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { ImageActionMenu } from "~/components/images/ImageActionMenu";
import { convertByteToHumanReadable } from "~/helpers/data-size-helper";
import { durationHelper, formatUnixTime } from "~/helpers/date-helper";
import { shortenSha256Hash } from "~/helpers/string-helper";
import { useRouter } from "~/hooks/router-hooks";
import {
  ImageEvent,
  useSubscribeImageEvents,
} from "~/hooks/subscribe-image-events";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";
import styles from "./Images.module.css";

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
  const router = useRouter();

  const { data, mutate } = useSWR("images", wails.ImageLs, {
    refreshInterval: durationHelper({ seconds: 30 }).asMilliseconds(),
  });
  const revalidateImages = debounce(
    () => {
      // There is a time lag before their status is reflected
      setTimeout(
        () => {
          mutate(() => data);
        },
        durationHelper({ seconds: 0.2 }).asMilliseconds()
      );
    },
    durationHelper({ seconds: 0.2 }).asMilliseconds()
  );

  useSubscribeImageEvents((e) => {
    const msg = notifyMessage(e);
    msg && showSuccessToast(msg);

    revalidateImages();
  });

  return (
    <Table
      pagination={false}
      rowKey="Id"
      dataSource={data}
      rowClassName={styles.row}
      onRow={(record) => {
        return {
          onClick: () => router.push(`image/${record.Id}`),
        };
      }}
      columns={[
        {
          title: "ID",
          dataIndex: "Id",
          key: "Id",
          render: (id: string) => (
            <div className={styles.id}>
              <Typography.Text copyable>
                {shortenSha256Hash(id)}
              </Typography.Text>
            </div>
          ),
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
          onCell: () => ({
            onClick: (e) => e.stopPropagation(),
          }),
        },
      ]}
    />
  );
};
