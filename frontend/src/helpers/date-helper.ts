import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";

dayjs.extend(Duration);

export const defaultDateTimeFormat = "YYYY-MM-DD HH:mm:ss" as const;

export const formatUnixTime = (unix: number): string =>
  dayjs(unix * 1000).format(defaultDateTimeFormat);

export const durationHelper = dayjs.duration;
