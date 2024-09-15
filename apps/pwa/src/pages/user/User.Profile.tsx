import Card from "@/components/card";
import { trpcFetch } from "@/trpc/trpcFetch";
import {
  BankOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  GetProp,
  Input,
  message,
  Spin,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

type UserProfileType = {
  collegeId: string | null;
  currCompany: string | null;
  currRole: string | null;
  currentLocation: string | null;
  department: string | null;
  email: string;
  isVerified: boolean;
  mobileNumber: string | null;
  name: string;
  profilePicture: string | null;
  linkedinProfile: string | null;
  graduationYear: string | null;
};
export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export function UserPage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [editing, setEditing] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [profilePictureFileList, setProfilePictureFileList] =
    useState<UploadFile | null>(null);
  const [form] = useForm<UserProfileType>();

  useEffect(() => {
    trpcFetch.getProfile.query().then((data) => {
      form.setFieldsValue({
        ...data,
        graduationYear: data.graduationYear?.toString() ?? "",
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldValue("profilePicture", profilePictureFileList?.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureFileList]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await getBase64(file.originFileObj as FileType);
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const getBase64 = (file: FileType): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (
    fileList: UploadChangeParam<UploadFile<unknown>>
  ) => {
    if (fileList.file?.status === "removed") {
      setProfilePictureFileList(null);
    } else {
      setIsImageUploading(true);
      await uploadImage(fileList.file);
      setIsImageUploading(false);
    }
  };

  const uploadImage = async (file: UploadFile): Promise<void> => {
    message.loading("Uploading image...");
    const url = await getBase64(file.originFileObj as FileType);
    const cdnUrl = await trpcFetch.addImage.mutate(url);
    form.setFieldValue("profilePicture", cdnUrl);
    setProfilePictureFileList({
      uid: "1",
      url: cdnUrl,
      name: "image.png",
      status: "done",
    });

    message.success("Image uploaded successfully!");
  };

  const onFinish = async (values: UserProfileType) => {
    console.info(values);
    try {
      await trpcFetch.profileUpdate.query({
        ...values,
      });

      message.success("Profile updated successfully!");
    } catch (_) {
      message.error("Failed to update profile!");
      return;
    }
    setEditing(false);
  };

  return (
    <div className="p-2 w-full">
      <Card className="max-w-5xl">
        <Form form={form} className="w-full" onFinish={onFinish}>
          <Flex justify="space-around" gap={"small"} className="w-full">
            <Flex
              vertical
              gap={"small"}
              className="w-full"
              justify="center"
              align="center"
            >
              <Form.Item name="profilePicture" noStyle />
              <Upload
                listType="picture-card"
                fileList={
                  profilePictureFileList ? [profilePictureFileList] : []
                }
                onChange={async (FileList) => await handleChange(FileList)}
                onPreview={onPreview}
                maxCount={1}
                multiple={false}
                className="justify-center items-center flex"
              >
                {isImageUploading ? (
                  <Spin size="large" />
                ) : (
                  <UserOutlined
                    style={{ fontSize: "74px" }}
                    className="text-primary"
                  />
                )}
              </Upload>
              <Flex vertical justify="center" align="center">
                <Typography.Title
                  level={isMobile ? 3 : 1}
                  style={{ margin: 0 }}
                >
                  {form.getFieldValue("name")}
                </Typography.Title>
                {editing ? (
                  <Flex
                    align="center"
                    gap={"small"}
                    justify="center"
                    className="w-full"
                  >
                    <Form.Item
                      name="graduationYear"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Passout Year!",
                        },
                      ]}
                      style={{ margin: 0, width: "100%" }}
                    >
                      <Input
                        size="large"
                        placeholder="Passout Year"
                        disabled={!editing}
                      />
                    </Form.Item>
                  </Flex>
                ) : (
                  <Typography.Title
                    level={isMobile ? 4 : 2}
                    style={{ margin: 0 }}
                  >
                    Class of {form.getFieldValue("graduationYear")}
                  </Typography.Title>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          <Flex vertical={true} gap={"small"} className="w-full">
            <Typography.Title level={3}>About</Typography.Title>
            <Flex className="w-full" vertical>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  disabled={!editing}
                  size="large"
                  maxLength={100}
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please type your department!",
                  },
                ]}
              >
                <Input
                  disabled={!editing}
                  size="large"
                  maxLength={100}
                  placeholder="Department"
                />
              </Form.Item>
              <Form.Item
                name="collegeId"
                rules={[
                  {
                    required: true,
                    message: "Please type your enrollment no!",
                  },
                ]}
              >
                <Input
                  disabled={!editing}
                  size="large"
                  maxLength={100}
                  placeholder="Enrollment No"
                />
              </Form.Item>
            </Flex>
          </Flex>
          <Flex
            vertical={isMobile}
            gap={"large"}
            className="w-full"
            justify="center"
            align="center"
          >
            <Flex vertical gap={"large"} className="w-full">
              <Typography.Title level={3}>Contact Information</Typography.Title>
              <Flex
                align="center"
                justify="center"
                gap={"small"}
                className="w-full"
              >
                <MailOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input size="large" placeholder="Email" disabled={!editing} />
                </Form.Item>
              </Flex>
              <Flex
                align="center"
                gap={"small"}
                justify="center"
                className="w-full"
              >
                <MobileOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="mobileNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobile number!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Mobile Number"
                    disabled={!editing}
                  />
                </Form.Item>
              </Flex>
              <Flex
                align="center"
                justify="center"
                gap={"small"}
                className="w-full"
              >
                <EnvironmentOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="currentLocation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your location!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Location"
                    disabled={!editing}
                  />
                </Form.Item>
              </Flex>
            </Flex>
            <Flex vertical gap={"large"} className="w-full">
              <Typography.Title level={3}>
                Professional Details
              </Typography.Title>
              <Flex
                align="center"
                justify="center"
                gap={"small"}
                className="w-full"
              >
                <BankOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="currCompany"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current comapany!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Current company"
                    disabled={!editing}
                  />
                </Form.Item>
              </Flex>
              <Flex
                align="center"
                justify="center"
                gap={"small"}
                className="w-full"
              >
                <BankOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="currRole"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current role!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Current role"
                    disabled={!editing}
                  />
                </Form.Item>
              </Flex>
              <Flex
                align="center"
                justify="center"
                gap={"small"}
                className="w-full"
              >
                <LinkedinOutlined style={{ fontSize: "24px" }} />
                <Form.Item
                  name="linkedinProfile"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current role!",
                    },
                  ]}
                  style={{ margin: 0, width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="LinkedIn URL"
                    disabled={!editing}
                  />
                </Form.Item>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            gap={"small"}
            className="w-full"
            justify="end"
            align="center"
            style={{ marginTop: isMobile ? "20px" : "10px", padding: "5px" }}
          >
            {editing ? (
              <Button htmlType="submit" type="primary" size="large">
                Save
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Flex>
        </Form>
      </Card>
    </div>
  );
}
