import React from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { useUserInfo } from "@/store/userStore";
import { useForm } from "antd/es/form/Form";

export const Home: React.FC = () => {
  const UserInfo = useUserInfo();

  const [form] = useForm();

  const onFinish = async (values: { email: string; userName: string }) => {
    console.info(values);
    message.success("Successfully Submitted");
  };

  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      <Typography.Title level={3}>Home</Typography.Title>
      <Typography.Title level={3}>
        User Info: {JSON.stringify(UserInfo)}
      </Typography.Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="userName" label="userName">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
