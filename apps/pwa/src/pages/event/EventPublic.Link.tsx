import React, { useEffect, useState } from "react";
import { Typography, Button, Space, Avatar, Tooltip } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { trpcFetch } from "@/trpc/trpcFetch";
import { useParams } from "react-router-dom";
import Card from "@/components/card";
import { useRouter } from "@/router/hooks";

const { Title, Text, Paragraph } = Typography;

type Event = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventType: string;
  eventTime: string;
  capacity: string;
  description: string;
  location: string;
  organizerId?: string | null;
};

const attendees = [
  { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
];

export const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    trpcFetch.getEventById.query(id ?? "").then((data) => {
      console.info(data);
      setEventData(data);
    });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData?.eventTitle,
        text: `Check out this event: ${eventData?.eventTitle}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Share this link: ${window.location.href}`);
    }
  };

  const handleRegister = () => {
    router.push(`/event/register/${id}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Title level={2}>{eventData?.eventTitle}</Title>
              <Text type="secondary">{eventData?.eventType}</Text>
            </div>
            <Button icon={<ShareAltOutlined />} onClick={handleShare} />
          </div>

          <Space direction="vertical">
            <Space>
              <CalendarOutlined />
              <Text>{eventData?.eventDate}</Text>
            </Space>
            <Space>
              <ClockCircleOutlined />
              <Text>{eventData?.eventTime}</Text>
            </Space>
            <Space>
              <EnvironmentOutlined />
              <Text>{eventData?.location}</Text>
            </Space>
            <Space>
              <UsergroupAddOutlined />
              <Text>Capacity: {eventData?.capacity}</Text>
            </Space>
          </Space>

          <div>
            <Title level={4}>Event Description</Title>
            <Paragraph>{eventData?.description}</Paragraph>
          </div>

          <div>
            <Title level={4}>Attendees</Title>
            <Avatar.Group maxCount={4}>
              {attendees.map((attendee, index) => (
                <Tooltip key={index} title={attendee.name}>
                  <Avatar src={attendee.avatar} alt={attendee.name}>
                    {attendee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                </Tooltip>
              ))}
              <Avatar style={{ backgroundColor: "#f56a00" }}>
                +{eventData?.capacity ?? -attendees.length}
              </Avatar>
            </Avatar.Group>
          </div>

          <Button type="primary" block onClick={handleRegister}>
            Register for Event
          </Button>
        </Space>
      </Card>
    </div>
  );
};
