import { Button, Card, Form, Input } from "antd";
import { useEffect, type FC } from "react";
import useSWR from "swr";
import { useToast } from "~/hooks/toast-hooks";
import { wails, type WailsTypes } from "~/wails";

export const Settings: FC = () => {
  const [form] = Form.useForm<WailsTypes.settings.Settings>();
  const { showSuccessToast } = useToast();
  const { data: settings } = useSWR("settings", wails.Settings);
  useEffect(() => {
    form.setFieldValue("socket", settings?.socket);
  }, [settings]);

  return (
    <Card>
      <Form
        name="basic"
        form={form}
        onFinish={(v) => {
          return wails.SaveSettings(v).then(() => {
            showSuccessToast("Settings saved");
          });
        }}
      >
        <Form.Item
          name="socket"
          label="Socket"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
        >
          <Input addonBefore="unix://" placeholder="/var/run/docker.sock" />
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
