import { Avatar, Button, Input, Radio, Table, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Courses } from "../../data/course.data";
import { useState } from "react";
import EnrolledCourses from "../../components/course/EnrolledCourses";
const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <Avatar
        src={image}
        shape="square"
        size="large"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description) => {
      return (
        <Tooltip title={description}>
          <div>
            {description.length > 50
              ? description.substring(0, 50) + "..."
              : description}
          </div>
        </Tooltip>
      );
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Course Start",
    dataIndex: "corseStart",
    key: "corseStart",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            console.log("Edit", record);
          }}
        />
        <Button type="primary" danger icon={<DeleteOutlined />} />
      </div>
    ),
  },
];

const AdminCoursePage = () => {
  const [position, setPosition] = useState(1);

  return (
    <div className="container">
      <div className="flex justify-start mb-3">
        <Radio.Group
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <Radio.Button value={1}>Course Management</Radio.Button>
          <Radio.Button value={2}>Enrolled Users</Radio.Button>
        </Radio.Group>
      </div>
      {position === 1 ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Courses
            </Button>
            <Input
              size="middle"
              placeholder="Search Courses"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <Table
            pagination={{
              pageSize: 5,
            }}
            columns={columns}
            dataSource={Courses}
          />
        </>
      ) : (
        <EnrolledCourses />
      )}
    </div>
  );
};

export default AdminCoursePage;
