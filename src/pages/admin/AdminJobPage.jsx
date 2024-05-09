import {
  Button,
  Input,
  Modal,
  Radio,
  Table,
  DatePicker,
  Popconfirm,
  Badge,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// import { Jobs } from "../../data/job.data";
import { useEffect, useState } from "react";
import AppliedJob from "../../components/job/AppliedJob";
import CustomLoading from "../../components/CustomLoading";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { CustomToastService } from "../../shared/message.service";

const AdminJobPage = () => {
  const [position, setPosition] = useState(1);
  const [showAddJob, setShowAddJob] = useState(false);
  const [errors, setErrors] = useState({});
  const [jobs, setJobs] = useState([]);
  const [jobsTemp, setJobsTemp] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  const [jobData, setJobData] = useState({
    _id: "",
    title: "",
    experience: "",
    salary: "",
    description: "",
    endingdate: "",
  });

  useEffect(() => {
    getAllJobs();

    if (authUser.userId) {
      getApplicationCount();
    }
  }, [position]);

  const getAllJobs = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/all/${authUser.userId}`);
      if (response.data) {
        setJobs(response.data);
        setJobsTemp(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getApplicationCount = async () => {
    try {
      const response = await axiosInstance.get(
        `/apply/count/${authUser.userId}`
      );
      if (response.data) {
        setApplicationCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addJob = async (e) => {
    e.preventDefault();

    const validationErrors = validate(jobData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      title: jobData.title.trim(),
      experience: jobData.experience,
      salary: jobData.salary,
      description: jobData.description,
      endingdate: jobData.endingdate,
      addedUser: authUser.userId,
    };

    try {
      const response = await axiosInstance.post("/jobs/add", request);
      CustomToastService.success(response.data.message);
      setShowAddJob(false);
      getAllJobs();
      clearJobData();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const openHandleEdit = (data) => {
    setJobData({
      _id: data._id,
      title: data.title,
      experience: data.experience,
      salary: data.salary,
      description: data.description,
      endingdate: data.endingdate,
    });

    setShowAddJob(true);
  };

  const clearJobData = () => {
    setJobData({
      _id: "",
      title: "",
      experience: "",
      salary: "",
      description: "",
      endingdate: "",
    });
    setErrors({});
    setShowAddJob(false);
  };

  const updateJob = async () => {
    const validationErrors = validate(jobData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      title: jobData.title.trim(),
      experience: jobData.experience,
      salary: jobData.salary,
      description: jobData.description,
      endingdate: jobData.endingdate,
    };

    try {
      const response = await axiosInstance.put(
        `/jobs/update/${jobData._id}`,
        request
      );
      CustomToastService.success(response.data.message);
      setShowAddJob(false);
      getAllJobs();
      clearJobData();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const validate = (date) => {
    let error = {};
    if (!date.title || date.title === "") {
      error.title = true;
    }
    if (!date.experience || date.experience === "") {
      error.experience = true;
    }
    if (!date.salary || date.salary === "") {
      error.salary = true;
    }
    if (!date.description || date.description === "") {
      error.description = true;
    }

    if (!date.endingdate || date.endingdate === "") {
      error.endingdate = true;
    }

    return error;
  };

  const onSearch = (e) => {
    if (e.target.value === "") {
      setJobs(jobsTemp);
    } else {
      const filteredJobs = jobsTemp.filter((job) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await axiosInstance.delete(`/jobs/delete/${id}`);
      CustomToastService.success(response.data.message);
      getAllJobs();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
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
      width: 500,
    },
    {
      title: "Ending Date",
      dataIndex: "endingdate",
      key: "endingdate",
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
            description="Are you sure you want to delete this job?"
            onConfirm={() => deleteJob(record._id)}
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
        <div className="flex justify-start mb-3">
          <Radio.Group
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <Radio.Button value={1}>Job Management</Radio.Button>
            <Badge count={applicationCount}>
              <Radio.Button value={2}>Applied Users</Radio.Button>
            </Badge>
          </Radio.Group>
        </div>
        {position === 1 ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setShowAddJob(true);
                }}
              >
                Add Job
              </Button>
              <Input
                size="middle"
                placeholder="Search Job"
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                onChange={(e) => {
                  onSearch(e);
                }}
              />
            </div>

            <Table
              pagination={{
                pageSize: 5,
              }}
              columns={columns}
              dataSource={jobs}
            />
          </>
        ) : (
          <AppliedJob />
        )}
      </div>

      <Modal
        title={jobData._id === "" ? "ADD JOB" : "UPDATE JOB"}
        open={showAddJob}
        onOk={jobData._id === "" ? addJob : updateJob}
        onCancel={() => {
          setShowAddJob(false);
          clearJobData();
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Title
              </label>
              <Input
                placeholder="Service Title"
                id="title"
                status={errors.title && "error"}
                value={jobData.title}
                onChange={(e) =>
                  setJobData({ ...jobData, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Ending Date
              </label>
              <DatePicker
                style={{ width: "100%" }}
                value={
                  jobData.endingdate
                    ? dayjs(jobData.endingdate, "YYYY-MM-DD")
                    : null
                }
                status={errors.endingdate && "error"}
                minDate={dayjs(dayjs().format("YYYY-MM-DD"), "YYYY-MM-DD")}
                onChange={(date, dateString) =>
                  setJobData({ ...jobData, endingdate: dateString })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Experience
              </label>
              <Input
                placeholder="Experience"
                id="experience"
                status={errors.experience && "error"}
                value={jobData.experience}
                onChange={(e) =>
                  setJobData({ ...jobData, experience: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Salary
              </label>
              <Input
                placeholder="Salary"
                id="salary"
                status={errors.salary && "error"}
                value={jobData.salary}
                onChange={(e) =>
                  setJobData({ ...jobData, salary: e.target.value })
                }
              />
            </div>
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
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
              style={{ resize: "none" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminJobPage;
