import { Button, Input, Radio, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Jobs } from "../../data/job.data";
import { useState } from "react";
import AppliedJob from "../../components/job/AppliedJob";

const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Ending Date",
    dataIndex: "endingDate",
    key: "endingDate",
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

const AdminJobPage = () => {
  const [position, setPosition] = useState(1);
  return (
    <div className="container">
      <div className="flex justify-start mb-3">
        <Radio.Group
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <Radio.Button value={1}>Job Management</Radio.Button>
          <Radio.Button value={2}>Applied Users</Radio.Button>
        </Radio.Group>
      </div>
      {position === 1 ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Job
            </Button>
            <Input
              size="middle"
              placeholder="Search Job"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </div>

          <Table
            pagination={{
              pageSize: 5,
            }}
            columns={columns}
            dataSource={Jobs}
          />
        </>
      ) : (
        <AppliedJob />
      )}
    </div>
  );
};

export default AdminJobPage;
