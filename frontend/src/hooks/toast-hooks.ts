import { notification } from "antd";

export const useToast = () => {
  const showSuccessToast = (message: string) => {
    notification.success({
      message,
      duration: 1.5,
    });
  };
  const showOperationFailedToast = (operation: string, errMessage?: string) => {
    notification.error({
      message: `Failed to ${operation}${errMessage ? `\n${errMessage}` : ""}`,
      duration: 1.5,
    });
  };

  return { showSuccessToast, showOperationFailedToast };
};
