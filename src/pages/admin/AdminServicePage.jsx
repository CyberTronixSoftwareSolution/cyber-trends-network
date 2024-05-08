import { Button, Input, Modal, Popconfirm, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { CustomToastService } from "../../shared/message.service";

const AdminServicePage = () => {
  const [showAddService, setShowAddService] = useState(false);
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [servicesTemp, setServicesTemp] = useState([]);

  const [serviceData, setServiceData] = useState({
    _id: "",
    title: "",
    description: "",
    image: "",
  });

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getAllServices();
  }, []);

  const clearJobData = () => {
    setServiceData({
      _id: "",
      title: "",
      description: "",
    });
    setErrors({});
  };

  const addService = async (e) => {
    e.preventDefault();

    const validationErrors = validateService(serviceData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      title: serviceData.title,
      description: serviceData.description,
      addedUser: authUser.userId,
    };

    try {
      const response = await axiosInstance.post("/service/add", request);
      CustomToastService.success(response.data.message);
      setShowAddService(false);
      getAllServices();
      clearJobData();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const getAllServices = async () => {
    try {
      const response = await axiosInstance.get(
        `/service/all/${authUser.userId}`
      );
      if (response.data) {
        setServices(response.data);
        setServicesTemp(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchService = (e) => {
    if (e === "") {
      setServices(servicesTemp);
    } else {
      const filteredServices = servicesTemp.filter((service) =>
        service.title.toLowerCase().includes(e.toLowerCase())
      );
      setServices(filteredServices);
    }
  };

  const openHandleEdit = (data) => {
    setServiceData({
      _id: data._id,
      title: data.title,
      description: data.description,
    });
    setShowAddService(true);
  };

  // Update data in the table
  const updateService = async () => {
    const validationErrors = updateValidator(serviceData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      title: serviceData.title,
      description: serviceData.description,
    };

    try {
      const response = await axiosInstance.put(
        `/service/update/${serviceData._id}`,
        request
      );
      CustomToastService.success(response.data.message);
      setShowAddService(false);
      getAllServices();
      clearJobData();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axiosInstance.delete(`/service/delete/${id}`);
      CustomToastService.success(response.data.message);
      getAllServices();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Service Validate
  const validateService = (data) => {
    let error = {};
    if (!data.title || data.title === "") {
      error.title = true;
    }
    if (!data.description || data.description === "") {
      error.description = true;
    }

    return error;
  };

  const updateValidator = (data) => {
    let error = {};

    if (!data.title || data.title === "") {
      error.title = true;
    }

    if (!data.description || data.description === "") {
      error.description = true;
    }

    return error;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Added Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (createdAt) => {
        return createdAt.split("T")[0];
      },
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
              openHandleEdit(record);
            }}
          />
          <Popconfirm
            title="Delete Confirmation"
            description="Are you sure you want to delete this service?"
            onConfirm={() => deleteService(record._id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="bottomLeft"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <CustomLoading />}
      <div className="container">
        <div className="flex justify-between items-center mb-3">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setShowAddService(true);
            }}
          >
            Add Service
          </Button>
          <Input
            size="middle"
            placeholder="Search Service"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            onChange={(e) => searchService(e.target.value)}
          />
        </div>

        <Table
          pagination={{
            pageSize: 5,
          }}
          columns={columns}
          dataSource={services}
        />
      </div>

      <Modal
        title={serviceData._id === "" ? "ADD SERVICE" : "UPDATE SERVICE"}
        open={showAddService}
        onOk={serviceData._id === "" ? addService : updateService}
        onCancel={() => {
          setShowAddService(false);
          clearJobData();
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Title
            </label>
            <Input
              placeholder="Service Title"
              id="title"
              status={errors.title && "error"}
              value={serviceData.title}
              onChange={(e) =>
                setServiceData({ ...serviceData, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-base text-gray-500 required">
              Description
            </label>
            <TextArea
              rows={4}
              placeholder="Service Description"
              maxLength={500}
              showCount
              id="description"
              status={errors.description && "error"}
              value={serviceData.description}
              onChange={(e) =>
                setServiceData({ ...serviceData, description: e.target.value })
              }
              style={{ resize: "none" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminServicePage;
