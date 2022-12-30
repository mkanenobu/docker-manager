import { Button, Card, Form, Input } from "antd";
import { type FC } from "react";
import useSWR from "swr";
import { useToast } from "~/hooks/toast-hooks";
import { wails, type WailsTypes } from "~/wails";
import styles from "./Settings.module.css";

export const Settings: FC = () => {
  const [form] = Form.useForm<WailsTypes.settings.Settings>();
  const { showSuccessToast, showOperationFailedToast } = useToast();

  const { data: settings, mutate } = useSWR("settings", wails.Settings);

  const socket = Form.useWatch("socket", form);

  return (
    <Card>
      <Form
        name="basic"
        form={form}
        initialValues={settings}
        onFinish={(v) => {
          return wails.SaveSettings(v).then((res) => {
            if (res) {
              showSuccessToast("Settings saved");
            } else {
              showOperationFailedToast("save settings");
            }
          });
        }}
      >
        <Form.Item
          name={["socket"]}
          label="Socket"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 18 }}
        >
          <Input.Group compact>
            <Input
              className={styles.socketInput}
              addonBefore="unix://"
              placeholder="/var/run/docker.sock"
              // controlling
              value={socket}
              onChange={(e) => {
                form.setFieldValue("socket", e.target.value);
              }}
            />
            <Button
              onClick={() => {
                socket &&
                  wails.CheckConnection(socket).then((res) => {
                    if (res) {
                      showSuccessToast(`${socket} is OK`);
                      mutate();
                    }
                  });
              }}
            >
              Test
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
