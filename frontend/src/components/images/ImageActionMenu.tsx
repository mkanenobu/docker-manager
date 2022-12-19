import { DeleteOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import { ActionMenu } from "~/components/Atom/ActionMenu";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

const useImageActions = () => {
  const { showSuccessToast, showErrorToast } = useToast();

  const removeImage = async (imageId: string) => {
    return wails
      .ImageRemove(imageId)
      .then((res) => {
        if (res) {
          showSuccessToast("Image removed");
        }
      })
      .catch((err) => {
        showErrorToast("remove image", err.message);
      });
  };

  return { removeImage };
};

export const ImageActionMenu: FC<{
  imageId: string;
  revalidateImages: () => void;
}> = ({ imageId, revalidateImages }) => {
  const [opened, setOpened] = useState(false);
  const { removeImage } = useImageActions();

  return (
    <ActionMenu
      opened={opened}
      setOpened={setOpened}
      actions={[
        {
          key: "remove",
          label: "Remove",
          icon: <DeleteOutlined />,
          onClick: () => {
            setOpened(false);
            removeImage(imageId).then(() => revalidateImages());
          },
        },
      ]}
    />
  );
};
