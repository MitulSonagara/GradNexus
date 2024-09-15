import { Button, Flex, Form, Input, message, Typography } from "antd";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "@/router/hooks";

interface LoginFormType {
  email: string;
  userName: string;
  password: string;
  role: string;
}

export function RegisterForm() {
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
    console.info(values);
    await fetch(import.meta.env.VITE_BE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        router.replace("/auth/success");
      })
      .catch((err) => message.error(err.message));
    message.success("User Registered Successfully!");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  ">
        <Typography.Title level={1}>Register</Typography.Title>
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
              <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your userName!",
                },
              ]}
            >
              <Input size="large" placeholder="User Name" />
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
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your role!",
                },
              ]}
            >
              <Input placeholder="Role" size="large" />
            </Form.Item>
          </Flex>
          <Flex gap={"small"} className="w-full">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Register
            </Button>
            <Button
              size="large"
              type="default"
              onClick={() => router.push("/auth/login")}
              className="w-full"
            >
              Login
            </Button>
          </Flex>
        </Form>
      </div>
    </>
  );
}
