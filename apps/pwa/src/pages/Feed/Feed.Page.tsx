import React, { useEffect, useState } from "react";
import {
  Typography,
  Input,
  Select,
  Tabs,
  Card,
  Avatar,
  Button,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { trpcFetch } from "@/trpc/trpcFetch";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
import { useRouter } from "@/router/hooks";
const { Meta } = Card;

export interface User {
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
}

type Job = {
  jobId: string; // UUID
  postedBy: string; // ForeignKey to UserTable (UUID)
  jobTitle: string;
  companyName: string;
  location: string;
  description: string;
  salaryRange: string;
  jobType: string;
};

export const NetworkingHome: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    trpcFetch.getAllJobs.query().then((data) => {
      setJobs(data);
    });
    trpcFetch.getProfile.query().then((data) => {
      setUser(data);
    });
  }, []);

  const handleApplication = (jobId: string) => {
    if (!user?.mobileNumber) {
      message.error("Please complete your profile first!")
    }else{
      router.push(`/job/application/${jobId}`);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        FEED
      </Title>

      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        style={{
          marginBottom: 24,
          width: "100%",
          justifyContent: isMobile ? "center" : "space-between",
        }}
      >
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search alumni..."
          style={{ width: isMobile ? "100%" : 240 }}
        />
        <Select
          mode="multiple"
          maxTagCount={"responsive"}
          size="large"
          style={{ width: isMobile ? "100%" : 240 }}
          placeholder="Filter by industry"
        >
          <Select.Option value="tech">Technology</Select.Option>
          <Select.Option value="finance">Finance</Select.Option>
          <Select.Option value="healthcare">Healthcare</Select.Option>
          <Select.Option value="education">Education</Select.Option>
        </Select>
      </Space>

      <Tabs defaultActiveKey="connections">
        <TabPane tab="Job Postings" key="jobs">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row gutter={[16, 16]}>
              {jobs.map((jobs) => (
                <Col xs={24} sm={12} lg={8} key={jobs.jobId}>
                  <Card key={jobs.jobId}>
                    <Meta title={jobs.jobTitle} description={jobs.location} />
                    <Text
                      style={{
                        margin: "16px 0",
                        display: "block",
                        textAlign: "justify",
                      }}
                    >
                      {jobs.description}
                    </Text>
                    <Button type="primary" onClick={() => handleApplication(jobs.jobId)}>Apply Now</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </TabPane>

        <TabPane tab="Mentorship" key="mentorship">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Meta
                  avatar={
                    <Avatar
                      src={`/placeholder.svg?height=40&width=40`}
                      icon={<UserOutlined />}
                    />
                  }
                  title={`Mentor Name ${i}`}
                  description="20+ years in Finance"
                />
                <Text style={{ margin: "16px 0", display: "block" }}>
                  Offering career guidance and industry insights for finance
                  graduates.
                </Text>
                <Button type="primary">Request Mentorship</Button>
              </Card>
            ))}
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
};
