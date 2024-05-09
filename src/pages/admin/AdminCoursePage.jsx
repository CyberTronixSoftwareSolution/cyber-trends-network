import {
  Avatar,
  Badge,
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Table,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import EnrolledCourses from "../../components/course/EnrolledCourses";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import uploadImageToCloudinary from "../../shared/cloudinaryUpload.service";
import { CustomToastService } from "../../shared/message.service";

const AdminCoursePage = () => {
  const [position, setPosition] = useState(1);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [errors, setErrors] = useState({});
  const [courseData, setCourseData] = useState({
    _id: "",
    image: "",
    title: "",
    description: "",
    duration: 0,
    poststart: "",
  });
  const [courses, setCourses] = useState([]);
  const [tempCourses, setTempCourses] = useState([]);
  const [enrollCount, setEnrollCount] = useState(0);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    if (authUser.userId) {
      getAllCourses();
      getEnrolledCount();
    }
  }, [position]);

  const getEnrolledCount = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/count/${authUser.userId}`
      );
      setEnrollCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const searchCourses = (e) => {
    if (e.target.value === "") {
      setCourses(tempCourses);
    } else {
      const filteredCourses = tempCourses.filter((course) =>
        course.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCourses(filteredCourses);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/all/${authUser.userId}`
      );
      setCourses(response.data);
      setTempCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();

    const validationErrors = validateCourse(courseData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    const request = {
      image: "",
      title: courseData.title,
      description: courseData.description,
      duration: courseData.duration,
      poststart: courseData.poststart,
      addedUser: authUser.userId,
    };

    if (courseData.image) {
      const imageUrl = await uploadImageToCloudinary(
        courseData.image,
        "YoungNetwork",
        axiosInstance
      );

      request.image = imageUrl;
    }

    try {
      const response = await axiosInstance.post("/course/create", request);
      CustomToastService.success(response.data.message);
      setShowAddCourse(false);
      getAllCourses();
      clearCourseData();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const updateCourse = async () => {
    const validationErrors = updateValidateCourse(courseData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    const request = {
      image: "",
      title: courseData.title,
      description: courseData.description,
      duration: courseData.duration,
      poststart: courseData.poststart,
    };

    let imageType = typeof courseData.image;
    if (courseData.image && imageType == "object") {
      const imageUrl = await uploadImageToCloudinary(
        courseData.image,
        "YoungNetwork",
        axiosInstance
      );

      request.image = imageUrl;
    } else {
      delete request.image;
    }

    try {
      const response = await axiosInstance.put(
        `/course/update/${courseData._id}`,
        request
      );
      CustomToastService.success(response.data.message);
      setShowAddCourse(false);
      getAllCourses();
      clearCourseData();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const openHandleEdit = (data) => {
    setCourseData({
      _id: data._id,
      image: data.image,
      title: data.title,
      description: data.description,
      duration: Number(data.duration),
      poststart: data.poststart,
    });
    setShowAddCourse(true);
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axiosInstance.delete(`/course/delete/${id}`);
      CustomToastService.success(response.data.message);
      getAllCourses();
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const clearCourseData = () => {
    setCourseData({
      _id: "",
      image: "",
      title: "",
      description: "",
      duration: 0,
      poststart: "",
    });
    setErrors({});
    setShowAddCourse(false);
  };

  const validateCourse = (data) => {
    let error = {};

    if (!data.title || data.title === "") {
      error.title = true;
    }

    if (!data.description || data.description === "") {
      error.description = true;
    }

    if (!data.duration || data.duration === 0) {
      error.duration = true;
    }

    if (!data.poststart || data.poststart === "") {
      error.poststart = true;
    }

    if (!data.image || data.image === "") {
      error.image = true;
    }

    return error;
  };

  const updateValidateCourse = (data) => {
    let error = {};

    if (!data.title || data.title === "") {
      error.title = true;
    }

    if (!data.description || data.description === "") {
      error.description = true;
    }

    if (!data.duration || data.duration === 0) {
      error.duration = true;
    }

    if (!data.poststart || data.poststart === "") {
      error.poststart = true;
    }

    return error;
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Avatar
          src={image}
          shape="square"
          size="large"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        return (
          <Tooltip title={description}>
            <div>
              {description.length > 50
                ? description.substring(0, 50) + "..."
                : description}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => {
        return duration + " Months";
      },
    },
    {
      title: "Course Start",
      dataIndex: "poststart",
      key: "poststart",
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
            description="Are you sure you want to delete this course?"
            onConfirm={() => deleteCourse(record._id)}
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
            <Radio.Button value={1}>Course Management</Radio.Button>
            <Badge count={enrollCount}>
              <Radio.Button value={2}>Enrolled Users</Radio.Button>
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
                  setShowAddCourse(true);
                }}
              >
                Add Courses
              </Button>
              <Input
                size="middle"
                placeholder="Search Courses"
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                onChange={searchCourses}
              />
            </div>

            <Table
              pagination={{
                pageSize: 5,
              }}
              columns={columns}
              dataSource={courses}
            />
          </>
        ) : (
          <EnrolledCourses />
        )}
      </div>
      <Modal
        title={courseData._id === "" ? "ADD COURSE" : "UPDATE COURSE"}
        open={showAddCourse}
        onOk={courseData._id === "" ? addCourse : updateCourse}
        onCancel={() => {
          setShowAddCourse(false);
          clearCourseData();
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
                value={courseData.title}
                onChange={(e) =>
                  setCourseData({ ...courseData, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-base text-gray-500 required">
                Course Start
              </label>
              <DatePicker
                style={{ width: "100%" }}
                value={
                  courseData.poststart
                    ? dayjs(courseData.poststart, "YYYY-MM-DD")
                    : null
                }
                status={errors.poststart && "error"}
                minDate={dayjs(dayjs().format("YYYY-MM-DD"), "YYYY-MM-DD")}
                onChange={(date, dateString) =>
                  setCourseData({ ...courseData, poststart: dateString })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-base text-gray-500 required">
                Duration
              </label>
              <InputNumber
                placeholder="Duration"
                id="duration"
                status={errors.duration && "error"}
                value={courseData.duration}
                onChange={(value) =>
                  setCourseData({ ...courseData, duration: value })
                }
                addonAfter="Months"
                min={1}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                className={`text-sm font-base text-gray-500 ${
                  courseData._id === "" ? "required" : ""
                }`}
              >
                Image
              </label>
              <Input
                type="file"
                id="image"
                status={errors.image && "error"}
                onChange={(e) =>
                  setCourseData({ ...courseData, image: e.target.files[0] })
                }
                allowClear={true}
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
              value={courseData.description}
              onChange={(e) =>
                setCourseData({ ...courseData, description: e.target.value })
              }
              style={{ resize: "none" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminCoursePage;
