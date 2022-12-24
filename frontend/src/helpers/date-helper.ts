import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";

dayjs.extend(Duration);

export const unixToHuman = (unix: number) =>
  dayjs(unix * 1000).format("YYYY-MM-DD HH:mm:ss");

export const durationHelper = dayjs.duration;
