export const convertByteToHumanReadable = (
  bytes: number,
): { value: number; unit: "MB" | "KB" } => {
  let value = bytes / 1000;
  if (value < 1000) {
    return { value, unit: "KB" };
  }
  return { value: value / 1000, unit: "MB" };
};
