import React from "react";
import { Card, Typography, Form, Input, Radio, Button, message } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

// In a real application, you would fetch this data based on the event ID from the URL
const eventData = {
  id: "evt123456",
  title: "Annual Alumni Gala",
  date: "September 15, 2023",
  time: "7:00 PM - 11:00 PM",
  location: "Grand Ballroom, University Center",
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  graduationYear: string;
  dietaryRestrictions: string;
  attendeeType: string;
}

export const EventRegistration: React.FC = () => {
  const [form] = Form.useForm<FormData>();

  const handleSubmit = async (values: FormData) => {
    console.info("Submitting registration:", values);
    message.success("Registration submitted successfully!");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Title level={3}>Register for Event</Title>
        <Paragraph>
          Please fill out the form below to register for {eventData.title}
        </Paragraph>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Phone Number" size="large" />
          </Form.Item>

          <Form.Item
            name="graduationYear"
            rules={[
              { required: true, message: "Please input your graduation year!" },
            ]}
          >
            <Input type="number" placeholder="Graduation Year" size="large" />
          </Form.Item>

          <Form.Item name="dietaryRestrictions" label="Dietary Restrictions">
            <TextArea
              placeholder="Please list any dietary restrictions or allergies"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="attendeeType"
            label="Attendee Type"
            initialValue="alumni"
          >
            <Radio.Group size="large">
              <Radio value="alumni">Alumni</Radio>
              <Radio value="student">Current Student</Radio>
              <Radio value="guest">Guest</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Complete Registration
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
