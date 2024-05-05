import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const AdminUserPage = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Users</h1>
            <Input
              size="middle"
              placeholder="Search Users"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <span>Table 01</span>
        </div>

        <div className="flex flex-col gap-4">
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
        </div>

        <div className="flex flex-col gap-4">
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
        </div>

        <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
