import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import CustomLoading from "../CustomLoading";
const columns = [
  {
    title: "Job Title",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Company",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
    render: (experience) => {
      return experience + " Years";
    },
  },
  {
    title: "Candidate Name",
    dataIndex: "userId",
    key: "userId",
    render: (userId) => {
      return userId.name;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "userId",
    key: "userId",
    render: (userId) => {
      return userId.phone;
    },
  },
  {
    title: "Applied Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return createdAt.split("T")[0];
    },
  },
];
const AppliedJob = () => {
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [tempAppliedUsers, setTempAppliedUsers] = useState([]);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getAllAppliedJobs();
  }, [authUser.userId]);

  const searchAppliedJobs = (e) => {
    if (e.target.value === "") {
      setAppliedUsers(tempAppliedUsers);
    } else {
      const filteredUsers = tempAppliedUsers.filter(
        (user) =>
          user.position.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.userId.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setAppliedUsers(filteredUsers);
    }
  };

  const getAllAppliedJobs = async () => {
    try {
      const response = await axiosInstance.get(`/apply/all/${authUser.userId}`);
      if (response.data) {
        setAppliedUsers(response.data);
        setTempAppliedUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="flex justify-end items-center mb-3">
        <Input
          size="middle"
          placeholder="Search Applied Job"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          onChange={searchAppliedJobs}
        />
      </div>
      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={appliedUsers}
      />
    </>
  );
};

export default AppliedJob;
