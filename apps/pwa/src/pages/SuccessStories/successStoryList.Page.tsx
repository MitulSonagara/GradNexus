import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Input,
  Select,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "@/router/hooks";
import { trpcFetch } from "@/trpc/trpcFetch";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

type SuccessStory = {
  storyId: string;
  alumniId: string;
  storyTitle: string;
  storyContent: string;
  postedAt: string;
};

const mockSuccessStories: SuccessStory[] = [
  {
    storyId: "1",
    alumniId: "A001",
    storyTitle: "From Classroom to CEO",
    storyContent: "After graduating, I founded a tech startup that...",
    postedAt: "2023-06-15T10:30:00Z",
  },
  {
    storyId: "2",
    alumniId: "A002",
    storyTitle: "Making a Difference in Healthcare",
    storyContent: "My research at the university led to a breakthrough in...",
    postedAt: "2023-06-14T14:45:00Z",
  },
];

export const SuccessStories: React.FC = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const router = useRouter();

  useEffect(() => {
    trpcFetch.getAllSuccessStories.query().then((data) => {
      console.info(data);
      setStories(data);
    });
    setStories(mockSuccessStories);
  }, []);

  const filteredAndSortedStories = stories
    .filter(
      (story) =>
        story.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.storyContent.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      } else {
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
      }
    });

  const handleReadFullStory = (storyId: string) => {
    router.push(`/success-stories/view/${storyId}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Alumni Success Stories
      </Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Input
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
            size="large"
          />
        </Col>
        <Col span={6}>
          <Select
            style={{ width: "100%" }}
            value={sortBy}
            onChange={setSortBy}
            size="large"
          >
            <Option value="newest">Newest First</Option>
            <Option value="oldest">Oldest First</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {filteredAndSortedStories.map((story) => (
          <Col xs={24} sm={12} lg={8} key={story.storyId}>
            <Card
              actions={[
                <Button
                  key="read"
                  onClick={() => handleReadFullStory(story.storyId)}
                  type="primary"
                  size="large"
                  className="w-[80%]"
                >
                  Read Full Story
                </Button>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={`/placeholder.svg?height=40&width=40`}
                  />
                }
                title={story.storyTitle}
                description={
                  <Space direction="vertical" size={0}>
                    <Text type="secondary">Alumni {story.alumniId.slice(0,4)}</Text>
                    <Text type="secondary">
                      Posted on {new Date(story.postedAt).toLocaleDateString()}
                    </Text>
                  </Space>
                }
              />
              <Paragraph ellipsis={{ rows: 3 }} style={{ marginTop: 16 }}>
                {story.storyContent}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
