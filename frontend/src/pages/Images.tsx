import { Text } from "@geist-ui/core";
import useSWR from "swr";
import { wails } from "../models/wails";
import { Table } from "@geist-ui/core";
import { convertByteToHumanReadable } from "../helpers/data-size-helper";
import { unixToHuman } from "../helpers/date-helper";

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
      <Text h1>Images</Text>
      <Table data={formatData(data ?? [])}>
        <Table.Column prop="ImageId" label="Image ID" />
        <Table.Column prop="Repository" label="Repository" />
        <Table.Column prop="Tag" label="Tag" />
        <Table.Column
          prop="Size"
          label="Size"
          render={(v) => {
            const { value, unit } = convertByteToHumanReadable(v);
            return (
              <div>
                {sizeFormatter(value)}
                {unit}
              </div>
            );
          }}
        />
        <Table.Column
          prop="Created"
          label="Created"
          render={(v) => <div>{unixToHuman(v)}</div>}
        />
      </Table>
    </>
  );
};
