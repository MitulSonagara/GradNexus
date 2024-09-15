import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography, Space, Spin } from "antd";
import { useParams, useRouter } from "@/router/hooks";
import Card from "@/components/card";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useUserInfo } from "@/store/userStore";

const { Title, Text, Paragraph } = Typography;

type SuccessStory = {
  storyId: string;
  alumniId: string;
  storyTitle: string;
  storyContent: string;
  postedAt: string;
};

export const FullSuccessStory: React.FC = () => {
  const {user} = useUserInfo()
  const [story, setStory] = useState<SuccessStory | null>(null);
  const router = useRouter();
  const {storyId} = useParams()
  useEffect(() => {
     storyId && trpcFetch.getSuccessStoryById.query({storyId : storyId ?? ""}).then((data) => {
      console.info(data);
      setStory({...data, alumniId : user?.name ?? data.alumniId});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  if (!story) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space align="center">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={`/placeholder.svg?height=64&width=64`}
            />
            <Space direction="vertical">
              <Title level={2} style={{ margin: 0 }}>
                {story.storyTitle}
              </Title>
              <Text type="secondary">
                Posted by Alumni {story.alumniId} on{" "}
                {new Date(story.postedAt).toLocaleDateString()}
              </Text>
            </Space>
          </Space>
          <Paragraph style={{ textAlign: "justify" }}>
            {story.storyContent}
          </Paragraph>
          <Button block type="primary" onClick={() => router.push("/success-stories/all")}>
            Back to All Stories
          </Button>
        </Space>
      </Card>
    </div>
  );
};
