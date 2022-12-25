import { DeleteOutlined } from "@ant-design/icons";
import { type FC } from "react";
import { ActionMenu } from "~/components/Atom/ActionMenu";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

const useImageActions = () => {
  const { showOperationFailedToast } = useToast();

  const removeImage = async (imageId: string) => {
    return wails.ImageRemove(imageId).catch((err) => {
      showOperationFailedToast("remove image", err.message);
    });
  };

  return { removeImage };
};

export const ImageActionMenu: FC<{
  imageId: string;
}> = ({ imageId }) => {
  const { removeImage } = useImageActions();

  return (
    <ActionMenu
      items={[
        {
          key: "remove",
          label: "Remove",
          icon: <DeleteOutlined />,
          onClick: () => removeImage(imageId),
        },
      ]}
    />
  );
};
