import dayjs from "dayjs";

export const unixToHuman = (unix: number) =>
  dayjs(unix * 1000).format("YYYY-MM-DD HH:mm:ss");
