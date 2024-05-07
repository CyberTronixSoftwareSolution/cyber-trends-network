import { Avatar, Input, Table } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
const columns = [
  {
    title: "image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <>
        {image ? (
          <Avatar
            src={image}
            shape="square"
            size="large"
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar
            shape="square"
            size="large"
            icon={<UserOutlined />}
            style={{ width: 40, height: 40 }}
          />
        )}
      </>
    ),
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Joined Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return createdAt.split("T")[0];
    },
  },
];

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);

  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/getAll");
      setUsers(response.data);
      setTempUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = (e) => {
    if (e === "") {
      setUsers(tempUsers);
    } else {
      const filteredUsers = tempUsers.filter((user) =>
        user.name.toLowerCase().includes(e.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };
  return (
    <>
      {loading && <CustomLoading />}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Users</h1>
            <Input
              size="middle"
              placeholder="Search Users"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
            />
          </div>

          <span>
            <Table
              pagination={{
                pageSize: 5,
              }}
              columns={columns}
              dataSource={users}
            />
          </span>
        </div>

        {/* <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Employee</h1>
            <Input
              size="middle"
              placeholder="Search Employee"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <span>Table 02</span>
        </div> */}

        {/* <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold"> Consultant </h1>
            <Input
              size="middle"
              placeholder="Search Consultant"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <span>Table 03</span>
        </div> */}

        {/* <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Business</h1>
            <Input
              size="middle"
              placeholder="Search Business"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <span>Table 04</span>
        </div> */}
      </div>
    </>
  );
};

export default AdminUserPage;
