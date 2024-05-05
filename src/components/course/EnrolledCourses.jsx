import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EnrolledUsers } from "../../data/course.data";
const columns = [
  {
    title: "Course Name",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Enrolled User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Enrolled User Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Enrolled Date",
    dataIndex: "date",
    key: "date",
  },
];

const EnrolledCourses = () => {
  return (
    <>
      <div className="flex justify-end items-center mb-3">
        <Input
          size="middle"
          placeholder="Search Enrolled Courses"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
      </div>
      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={EnrolledUsers}
      />
    </>
  );
};

export default EnrolledCourses;
