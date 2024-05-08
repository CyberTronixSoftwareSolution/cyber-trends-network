import { Button, Tooltip, Modal, Input, Avatar, InputNumber } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../CustomLoading";
import { CustomToastService } from "../../shared/message.service";

const JobCard = (prop) => {
  const [isShow, setIsShow] = useState(false);
  const [image, setImage] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [errors, setErrors] = useState({});
  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  const [applyData, setApplyData] = useState({
    experience: 0,
    email: "",
  });

  useEffect(() => {
    if (prop.job.addedUser.companyInformation.image) {
      setImage(prop.job.addedUser.companyInformation.image);
      setCompanyName(prop.job.addedUser.companyInformation.name);
    }
  }, [prop.job]);

  const applyForJob = async () => {
    // e.preventDefault();

    const validationErrors = applyValidations(applyData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }
    //    userId, jobId, companyName, position, experience, email
    let request = {
      userId: authUser.userId,
      jobId: prop.job._id,
      companyName: companyName,
      position: prop.job.title,
      experience: applyData.experience,
      email: applyData.email ? applyData.email : authUser.email,
    };

    try {
      const response = await axiosInstance.post("/apply/add", request);
      if (response.data) {
        CustomToastService.success("Applied successfully!");
        clearApplyData();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.error);
    }
  };

  const clearApplyData = () => {
    setApplyData({
      experience: 0,
      email: "",
    });
    setErrors({});
    setIsShow(false);
  };

  const applyValidations = (data) => {
    let errors = {};
    if (!data.experience || data.experience == 0) {
      errors.experience = true;
    }
    if (data.email && !isValidEmail(data.email)) {
      errors.email = true;
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <>
      <div
        className="group mx-2 mt-4 bg-white grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto"
        style={{ minHeight: "160px" }}
      >
        <a
          href="#"
          className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
        >
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            {image ? (
              <Avatar size={60} src={<img src={image} alt="avatar" />} />
            ) : (
              <Avatar size={60} icon={<UserOutlined />}></Avatar>
            )}
          </div>
        </a>
        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
          {/* <h3 className="text-sm text-gray-600">{companyName}</h3> */}
          <a
            href="#"
            className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
          >
            {companyName} ({prop.job.title})
          </a>
          <Tooltip
            title={prop.job.description}
            color="blue"
            key={prop.job._id}
            placement="bottom"
          >
            <p className="overflow-hidden pr-7 text-sm">
              {prop.job.description?.length > 80
                ? prop.job.description.slice(0, 80) + "..."
                : prop.job.description}
            </p>
          </Tooltip>
        </div>
        <div className="col-span-10 flex justify-between items-center mt-5 w-full">
          <div className="flex justify-start text-sm font-medium text-gray-500">
            <div className="">
              Experience:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {prop.job.experience}
              </span>
            </div>
            <div className="">
              Salary:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                {prop.job.salary}
              </span>
            </div>
          </div>
          <div className="">
            <Button
              icon={<RightCircleOutlined />}
              onClick={() => setIsShow(true)}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="APPLY FOR JOB"
        open={isShow}
        onOk={() => applyForJob()}
        onCancel={() => clearApplyData()}
        centered
        maskClosable={false}
        width={550}
        footer={[
          <Button key="back" onClick={() => clearApplyData()}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => applyForJob()}>
            Apply
          </Button>,
        ]}
      >
        <>
          {loading && <CustomLoading />}
          <div className="flex gap-4 items-center mb-6 mt-4">
            <div>
              {image ? (
                <Avatar size={50} src={<img src={image} alt="avatar" />} />
              ) : (
                <Avatar size={50} icon={<UserOutlined />}></Avatar>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{prop.job.title}</h3>
              <p className="text-sm text-gray-600">{prop.job.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* experience year, other mail */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1" style={{ width: "170px" }}>
                <label className="text-sm font-base text-gray-500 required">
                  Experience
                </label>
                <InputNumber
                  addonAfter="Years"
                  min={1}
                  max={20}
                  status={errors.experience && "error"}
                  value={applyData.experience}
                  onChange={(value) =>
                    setApplyData({ ...applyData, experience: value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-base text-gray-500">
                  Email (optional)
                </label>
                <Input
                  placeholder="Email"
                  status={errors.email && "error"}
                  value={applyData.email}
                  onChange={(e) =>
                    setApplyData({ ...applyData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default JobCard;
