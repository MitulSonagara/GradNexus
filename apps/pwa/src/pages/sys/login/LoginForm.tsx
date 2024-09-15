import { Button, Flex, Form, Input, message, Typography } from "antd";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "@/router/hooks";

interface LoginFormType {
  email: string;
  password: string;
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function LoginForm() {
  const { loginState } = useLoginStateContext();
  const [form] = useForm<LoginFormType>();
  const router = useRouter();

  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }
  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }
  const onFinish = async (values: LoginFormType) => {
    await fetch(import.meta.env.VITE_BE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          message.success("Successfully Login");
          router.replace("/auth/success");
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  ">
        <Typography.Title level={1}>Login</Typography.Title>
        <Form
          form={form}
          className="flex flex-col justify-center items-center gap-4 w-full"
          onFinish={onFinish}
        >
          <Flex vertical gap={"small"} justify="center" className="w-full">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
          </Flex>
          <Flex gap={"small"} className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Login
            </Button>
            <Button
              size="large"
              type="default"
              onClick={() => router.push("/auth/register")}
              className="w-full"
            >
              Signup
            </Button>
          </Flex>
        </Form>
      </div>
    </>
  );
}
