import React from "react";
import { Button, Card, Form, Input, message, Flex, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useRouter } from "@/router/hooks";

const { TextArea } = Input;

interface SuccessStory {
  alumniId: string;
  storyTitle: string;
  storyContent: string;
}

export const AddSuccessStory: React.FC = () => {
  const [form] = Form.useForm<SuccessStory>();
  const router = useRouter();

  const onFinish = async (values: SuccessStory) => {
    try {
      const newSuccessStory = await trpcFetch.createSucessStory.query(values)
      
      console.info(newSuccessStory);
      message.success("Success story submitted successfully");
      router.push(`/success-stories/view/${newSuccessStory.storyId}`);
    } catch (error) {
      console.error("Error submitting success story:", error);
      message.error("Failed to submit success story");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card className="shadow-lg">
        <Typography.Title level={2}>Share Your Success Story</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Flex vertical gap={"small"} className="px-4 py-4">

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="storyTitle"
                rules={[
                  { required: true, message: "Please input your story title!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<FileTextOutlined />}
                  placeholder="Story Title"
                />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="storyContent"
                rules={[
                  {
                    required: true,
                    message: "Please share your success story!",
                  },
                ]}
              >
                <TextArea
                  size="large"
                  rows={4}
                  placeholder="Share your journey, achievements, and how your alma mater contributed to your success..."
                />
              </Form.Item>
            </Flex>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Submit Success Story
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};
