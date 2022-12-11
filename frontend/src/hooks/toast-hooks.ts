import { useToasts } from "@geist-ui/core";

export const useToast = () => {
  const { setToast, ...restOp } = useToasts();

  const showSuccessToast = (message: string) => {
    setToast({
      text: message,
      type: "success",
      delay: 3000,
    });
  };
  const showErrorToast = (operation: string, errMessage: string) => {
    setToast({
      text: `Failed to ${operation}\n${errMessage}`,
      delay: 3000,
      type: "error",
    });
  };

  return { ...restOp, showSuccessToast, showErrorToast };
};
