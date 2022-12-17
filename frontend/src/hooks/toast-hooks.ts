import { message } from "antd";

export const useToast = () => {
  const [messageApi, ctxHolder] = message.useMessage();

  const showSuccessToast = (message: string) => {
    messageApi.success({
      content: message,
      duration: 3000,
    });
  };
  const showErrorToast = (operation: string, errMessage: string) => {
    messageApi.error({
      content: `Failed to ${operation}\n${errMessage}`,
      duration: 3000,
    });
  };

  return { showSuccessToast, showErrorToast };
};
