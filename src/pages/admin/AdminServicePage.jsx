import { Services } from "../../data/service.data";
import { Button, Input, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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

const AdminServicePage = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center mb-3">
        <Button type="primary" icon={<PlusOutlined />}>
          Add Service
        </Button>
        <Input
          size="middle"
          placeholder="Search Service"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
      </div>

      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={Services}
      />
    </div>
  );
};

export default AdminServicePage;
