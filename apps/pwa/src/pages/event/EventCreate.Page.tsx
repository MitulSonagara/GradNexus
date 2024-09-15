import React from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  message,
  Flex,
  Typography,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useRouter } from "@/router/hooks";

interface EventData {
  title: string;
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  location: string;
  type: string;
  description: string;
  capacity: string;
}

interface CreatedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  capacity: string;
}

const { Option } = Select;
const { TextArea } = Input;

export const EventCreation: React.FC = () => {
  const [form] = Form.useForm<EventData>();
  const router = useRouter();

  const onFinish = async (values: EventData) => {
    try {
      // Simulating API call to create event
      const response = await new Promise<{ id: string }>((resolve) =>
        setTimeout(
          () => resolve({ id: Math.random().toString(36).substr(2, 9) }),
          1000
        )
      );

      const newEvent: CreatedEvent = {
        id: response.id,
        title: values.title,
        date: values.date?.format("MMMM D, YYYY") || "",
        time: `${values.startTime?.format("HH:mm")} - ${values.endTime?.format("HH:mm")}`,
        location: values.location,
        type: values.type,
        description: values.description,
        capacity: values.capacity,
      };

      const createdEvent = await trpcFetch.createEvent.query(newEvent);
      console.info(createdEvent);
      message.success("Event created successfully");
      router.push(`/event/public/${createdEvent.eventId}`);
      // form.resetFields();
    } catch (error) {
      console.error("Error creating event:", error);
      message.error("Failed to create event");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card className="shadow-lg">
        <Typography.Title level={2}>Create New Event</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Flex vertical gap={"small"} className="px-4 py-4">
            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Please input the event title!" },
                ]}
              >
                <Input size="large" placeholder="Event Title" />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="date"
                rules={[
                  { required: true, message: "Please select the event date!" },
                ]}
                style={{ flex: 1, minWidth: "200px" }}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Event Date"
                />
              </Form.Item>
            </Flex>
            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="type"
                rules={[
                  { required: true, message: "Please select the event type!" },
                ]}
                style={{ flex: 1, minWidth: "200px" }}
              >
                <Select size="large" placeholder="Select event type">
                  <Option value="social">Social Gathering</Option>
                  <Option value="career">Career Fair</Option>
                  <Option value="workshop">Workshop</Option>
                  <Option value="fundraiser">Fundraiser</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Flex>

            <Flex gap={4} wrap="wrap" vertical>
              <Flex gap={4} wrap="wrap">
                <Form.Item
                  name="startTime"
                  rules={[
                    { required: true, message: "Please input the start time!" },
                  ]}
                  style={{ flex: 1, minWidth: "200px" }}
                >
                  <TimePicker
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Start Time"
                  />
                </Form.Item>
                <Form.Item
                  name="endTime"
                  rules={[
                    { required: true, message: "Please input the end time!" },
                  ]}
                  style={{ flex: 1, minWidth: "200px" }}
                >
                  <TimePicker
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="End Time"
                  />
                </Form.Item>
              </Flex>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please input the event location!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<EnvironmentOutlined />}
                  placeholder="Location"
                />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item
                name="capacity"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input a valid capacity!",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="number"
                  placeholder="Enter maximum number of attendees"
                />
              </Form.Item>
            </Flex>

            <Flex vertical gap={4} wrap="wrap">
              <Form.Item name="description" rules={[{ required: true }]}>
                <TextArea
                  size="large"
                  rows={4}
                  placeholder="Provide a detailed description of the event"
                />
              </Form.Item>
            </Flex>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Create Event
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};
