import { Input, Table } from "antd";
import { AppliedUsers } from "../../data/job.data";
import { SearchOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Job Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Candidate Name",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Applied Date",
    dataIndex: "date",
    key: "date",
  },
];
const AppliedJob = () => {
  return (
    <>
      {" "}
      <div className="flex justify-end items-center mb-3">
        <Input
          size="middle"
          placeholder="Search Applied Job"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
      </div>
      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={AppliedUsers}
      />
    </>
  );
};

export default AppliedJob;
