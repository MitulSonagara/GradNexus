import React from "react";
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    InputNumber,
    message,
    Flex,
    Typography,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useRouter } from "@/router/hooks";

interface JobData {
    title: string;
    company: string;
    location: string;
    description: string;
    minSalary: string;
    maxSalary: string;
    jobType: string;
}

interface CreatedJob {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salaryRange: string;
    jobType: string;
}

const { Option } = Select;
const { TextArea } = Input;

export const JobCreationPage: React.FC = () => {
    const [form] = Form.useForm<JobData>();
    const router = useRouter();

    const onFinish = async (values: JobData) => {
        try {
            // Simulating API call to create event
            const response = await new Promise<{ id: string }>((resolve) =>
                setTimeout(
                    () => resolve({ id: Math.random().toString(36).substr(2, 9) }),
                    1000
                )
            );

            const newJob: CreatedJob = {
                id: response.id,
                title: values.title,
                company: values.company,
                location: values.location,
                description: values.description,
                salaryRange:`$${values.minSalary}-$${values.maxSalary}`,
                jobType: values.jobType,
            };

            const createdJob = await trpcFetch.createJob.query(newJob);
            console.info(createdJob);
            message.success("Job created successfully");
            router.push(`/feed/home`);
            // form.resetFields();
        } catch (error) {
            console.error("Error creating job:", error);
            message.error("Failed to create job");
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <Card className="shadow-lg">
                <Typography.Title level={2}>Create New Job</Typography.Title>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Flex vertical gap={"small"} className="px-4 py-4">
                        <Flex vertical gap={4} wrap="wrap">
                            <Form.Item
                                name="title"
                                rules={[
                                    { required: true, message: "Please input the job title!" },
                                ]}
                            >
                                <Input size="large" placeholder="Job Title" />
                            </Form.Item>
                        </Flex>

                        <Flex vertical gap={4} wrap="wrap">
                            <Form.Item
                                name="company"
                                rules={[
                                    { required: true, message: "Please input the company name!" },
                                ]}
                            >
                                <Input size="large" placeholder="Company Name" />
                            </Form.Item>
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
                            <Form.Item name="description" rules={[{ required: true }]}>
                                <TextArea
                                    size="large"
                                    rows={4}
                                    placeholder="Provide a detailed description of the job"
                                />
                            </Form.Item>
                        </Flex>

                        <Flex gap={4} wrap="wrap" vertical>
                            <Flex gap={4} wrap="wrap">
                                <Form.Item
                                    name="minSalary"
                                    rules={[
                                        { required: true, message: "Please input the minimum salary!" },
                                    ]}
                                    style={{ flex: 1, minWidth: "200px" }}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        addonAfter="$"
                                        placeholder="Minimum Salary"
                                        size="large"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="maxSalary"
                                    rules={[
                                        { required: true, message: "Please input the maximum salary!" },
                                    ]}
                                    style={{ flex: 1, minWidth: "200px" }}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        addonAfter="$"
                                        placeholder="Maximum Salary"
                                        size="large"
                                    />
                                </Form.Item>
                            </Flex>
                        </Flex>

                        
                        <Flex vertical gap={4} wrap="wrap">
                            <Form.Item
                                name="jobType"
                                rules={[
                                    { required: true, message: "Please select the job type!" },
                                ]}
                                style={{ flex: 1, minWidth: "200px" }}
                            >
                                <Select size="large" placeholder="Select job type">
                                    <Option value="internship">Internship</Option>
                                    <Option value="full-time">Full-time</Option>
                                    <Option value="part-time">Part-time</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Flex>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit">
                                Create Job
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Card>
        </div>
    );
};
