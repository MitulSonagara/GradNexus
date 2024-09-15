import React, { useEffect, useState } from "react";
import { Card, Typography, Form, Input, Button, message } from "antd";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useRouter } from "@/router/hooks";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
const { TextArea } = Input;

export type User = {
    id: string;
    name: string;
    collegeId: string | null;
    currCompany: string | null;
    currRole: string | null;
    department: string | null;
    email: string | null;
    isVerified: boolean;
    mobileNumber: string | null;
    graduationYear: number | null;
    profilePicture: string | null;
    role: string | null;
};

// In a real application, you would fetch this data based on the event ID from the URL
interface CreatedApplication {
    jobId:string;
    resumeUrl: string;
    coverLetter: string;
}

interface ApplicationData {
    resume: string;
    coverLetter: string;
}

export const JobApplicationPage: React.FC = () => {
    const [form] = Form.useForm<ApplicationData>();
    const [user, setUser] = useState<User>();
    const router = useRouter();
    const {jobId}  = useParams();

    const onFinish = async (values: ApplicationData) => {
        try {

            const newApplication: CreatedApplication = {
                jobId: jobId!,
                resumeUrl:values.resume,
                coverLetter:values.coverLetter,
            };

            const createdJob = await trpcFetch.jobApplication.createJobApplication.query(newApplication);
            console.info(createdJob);
            message.success("Applied Successfully");
            router.push(`/feed/home`);
            // form.resetFields();
        } catch (error) {
            console.error("Error applying job:", error);
            message.error("Failed to apply job");
        }
    };


    useEffect(() => {
        trpcFetch.getProfile.query().then((data) => {
            setUser(data);
        });
    }, []);


    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <Card>
                <Title level={3}>Apply For Job</Title>
                <Paragraph>
                    Please fill out the form below to apply for this position 
                </Paragraph>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input disabled placeholder={user?.name} size="large" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input disabled placeholder={user?.email ?? ""} size="large" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input placeholder={user?.mobileNumber ?? ""} disabled size="large" />
                    </Form.Item>

                    <Form.Item
                        name="resume"
                        label="Resume URL"
                        rules={[
                            { required: true, message: "Please input your google drive resume url!" },
                        ]}
                    >
                        <Input placeholder="Enter google drive link of your Resume" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="coverLetter"
                        label="Cover Letter"
                        rules={[{ required: true }
                        ]}>
                        <TextArea
                            size="large"
                            rows={5}
                            placeholder="Tell us why you are interested in this position and what makes you a great candidate..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit Application
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
