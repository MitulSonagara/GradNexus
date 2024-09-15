import { trpcFetch } from "@/trpc/trpcFetch";
import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    Input,
    Row,
    Select,
    Tabs,
    Typography,
    Tag
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Meta from "antd/es/card/Meta";
import { User } from "../Job/JobApplicationPage";
const { Title, Text } = Typography;

export interface ConnectionUser extends User {
    send: boolean;
}

console.info("Jay was here")
export const SearchConnection: React.FC = () => {
    const [users, setUsers] = useState<ConnectionUser[]>([]);
    const [searchString, setSearchString] = useState('');
    const [industryFilter, setIndustryFilter] = useState<string[]>([]);
    const [collegeFilter, setCollegeFilter] = useState<string[]>([]);
    const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
    const [graduationYearFilter, setGraduationYearFilter] = useState<number[]>([]);
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [roleFilter, setRoleFilter] = useState<string[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<ConnectionUser[]>([]);

    useEffect(() => {
        trpcFetch.getAllProfiles.query().then((data) => {
            const useData = data.map((user: User) => ({
                ...user,
                send: false,
            }));
            setUsers(useData);
            setFilteredUsers(useData);
        });
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchString, industryFilter, collegeFilter, departmentFilter, graduationYearFilter, companyFilter, roleFilter]);

    const connectPerson = (alumniId: string) => {
        trpcFetch.networking.createNetworkingHub
            .query({ alumniId }).then(() => {
                const updatedUsers = users.map((user) => {
                    if (user.id === alumniId) {
                        return {
                            ...user,
                            send: true,
                        };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            }).catch((err) => {
                console.error(err);
            });
    }

    const handleSearch = () => {
        const lowercasedSearchString = searchString.toLowerCase();
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
        const filtered = users.filter(user => {
            const matchesSearchString = searchString === "" || Object.values(user).some(value =>
                value?.toString().toLowerCase().includes(lowercasedSearchString)
            );
            const matchesIndustry = industryFilter.length === 0 || industryFilter.includes(user.currCompany?.toLowerCase() ?? "");
            const matchesCollege = collegeFilter.length === 0 || collegeFilter.includes(user.collegeId?.toLowerCase() ?? "");
            const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(user.department?.toLowerCase() ?? "");
            const matchesGraduationYear = graduationYearFilter.length === 0 || graduationYearFilter.includes(user.graduationYear ?? 0);
            const matchesCompany = companyFilter.length === 0 || companyFilter.includes(user.currCompany?.toLowerCase() ?? "");
            const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.currRole?.toLowerCase() ?? "");
            return matchesSearchString && matchesIndustry && matchesCollege && matchesDepartment && matchesGraduationYear && matchesCompany && matchesRole;
        });
        setFilteredUsers(filtered);
    };

    const getUniqueValues = (key: keyof User) => {
        return Array.from(new Set(users.map(user => user[key]?.toString().toLowerCase() ?? ""))).filter(value => value !== "");
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
            <Title level={2} style={{ marginBottom: 24 }}>
                Search Connection
            </Title>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <Input
                    size="large"
                    prefix={<SearchOutlined />}
                    placeholder="Search alumni..."
                    style={{ width: '100%' }}
                    onChange={e => setSearchString(e.target.value)}
                    onPressEnter={handleSearch}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by industry"
                        onChange={setIndustryFilter}
                    >
                        {getUniqueValues("currCompany").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by Id"
                        onChange={setCollegeFilter}
                    >
                        {getUniqueValues("collegeId").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by department"
                        onChange={setDepartmentFilter}
                    >
                        {getUniqueValues("department").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by graduation year"
                        onChange={setGraduationYearFilter}
                    >
                        {getUniqueValues("graduationYear").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by company"
                        onChange={setCompanyFilter}
                    >
                        {getUniqueValues("currCompany").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        mode="multiple"
                        maxTagCount={"responsive"}
                        size="large"
                        style={{ flex: '1 1 240px' }}
                        placeholder="Filter by role"
                        onChange={setRoleFilter}
                    >
                        {getUniqueValues("currRole").map(value => (
                            <Select.Option key={value} value={value}>{value}</Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            <div style={{ marginBottom: 24 }}>
                {industryFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
                {collegeFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
                {departmentFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
                {graduationYearFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
                {companyFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
                {roleFilter.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>

            <Tabs defaultActiveKey="connections">
                <TabPane tab="Connections" key="connections">
                    <Row gutter={[16, 16]}>
                        {filteredUsers.map((user) => (
                            <Col xs={24} sm={12} lg={8} key={user.id}>
                                <Card
                                    style={{ padding: 0 }}
                                    actions={[
                                        <Button
                                            key="connect"
                                            type="primary"
                                            style={{ width: "80%" }}
                                            onClick={() => connectPerson(user.id)}
                                        >
                                            {user.send ? "Sent" : "Connect"}
                                        </Button>,
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src={user?.profilePicture ?? ""} />}
                                        title={`${user.name}`}
                                        description={
                                            <>
                                                <Text type="secondary">
                                                    Class of {user?.graduationYear}
                                                </Text>
                                                <br />
                                                <Text>
                                                    {user.currRole} at {user.currCompany}
                                                </Text>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    );
};