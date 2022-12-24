import { notification } from "antd";
import type {ReactNode} from "react";

export const useToast = () => {
  const showSuccessToast = (message: ReactNode) => {
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
