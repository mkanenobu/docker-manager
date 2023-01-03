import { DeleteOutlined } from "@ant-design/icons";
import { type FC } from "react";
import useSWRMutation from "swr/mutation";
import { ActionMenu } from "~/components/Atom/ActionMenu";
import { useToast } from "~/hooks/toast-hooks";
import { wails } from "~/wails";

const useImageActions = (imageId: string) => {
  const { showOperationFailedToast } = useToast();

  const { trigger: removeImage } = useSWRMutation(imageId, wails.ImageRemove, {
    onError: (err) => showOperationFailedToast("remove image", err.message),
  });

  return { removeImage };
};

export const ImageActionMenu: FC<{
  imageId: string;
}> = ({ imageId }) => {
  const { removeImage } = useImageActions(imageId);

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
