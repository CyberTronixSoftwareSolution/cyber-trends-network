import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../CustomLoading";
const columns = [
  {
    title: "Course Name",
    dataIndex: "courseID",
    key: "courseID",
    render: (courseID) => {
      return courseID.title;
    },
  },
  {
    title: "Enrolled User",
    dataIndex: "userID",
    key: "userID",
    render: (userID) => {
      return userID.name;
    },
  },
  {
    title: "Enrolled User Email",
    dataIndex: "userID",
    key: "userID",
    render: (userID) => {
      return userID.email;
    },
  },
  {
    title: "Enrolled User Phone",
    dataIndex: "userID",
    key: "userID",
    render: (userID) => {
      return userID.phone;
    },
  },
  {
    title: "Remark",
    dataIndex: "remark",
    key: "remark",
    render: (remark) => {
      return remark ? remark : "-";
    },
  },
  {
    title: "Enrolled Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return createdAt.split("T")[0];
    },
  },
];

const EnrolledCourses = () => {
  const [EnrolledUsers, setEnrolledUsers] = useState([]);
  const [tempEnrolledUsers, setTempEnrolledUsers] = useState([]);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    loadEnrolledUsers();
  }, [authUser]);

  const searchEnrolledCourses = (e) => {
    if (e === "") {
      setEnrolledUsers(tempEnrolledUsers);
    } else {
      const filteredEnrolledUsers = tempEnrolledUsers.filter(
        (user) =>
          user.userID.name.toLowerCase().includes(e.toLowerCase()) ||
          user.courseID.title.toLowerCase().includes(e.toLowerCase())
      );
      setEnrolledUsers(filteredEnrolledUsers);
    }
  };

  const loadEnrolledUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/allEnroll/${authUser.userId}`
      );

      if (response.data) {
        setEnrolledUsers(response.data.enrollData);
        setTempEnrolledUsers(response.data.enrollData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <CustomLoading />}
      <div className="flex justify-end items-center mb-3">
        <Input
          size="middle"
          placeholder="Search Enrolled Courses"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          onChange={(e) => searchEnrolledCourses(e.target.value)}
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
