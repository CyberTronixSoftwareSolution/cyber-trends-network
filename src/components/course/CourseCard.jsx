import { Avatar, Button, Modal } from "antd";
import {
  RightCircleOutlined,
  UserOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../CustomLoading";
import TextArea from "antd/es/input/TextArea";

const CourseCard = (prop) => {
  const [isShowEnroll, setIsShowEnroll] = useState(false);
  const [user, setUser] = useState(null);
  const [enrollData, setEnrollData] = useState({
    remark: "",
  });

  const { loading } = useLoading();

  const { authUser } = useAuth();

  useEffect(() => {
    if (prop.course.addedUser) {
      setUser(prop.course.addedUser);
    }
  }, [authUser]);

  const enrollForCourse = async () => {
    // userID, courseID, remark
    let request = {
      userID: authUser.userId,
      courseID: prop.course._id,
      remark: enrollData.remark,
    };

    const result = await prop.enrollToCourse(request);

    if (result) {
      clearEnrollData();
    }
  };

  const clearEnrollData = () => {
    setEnrollData({
      remark: "",
    });
    setIsShowEnroll(false);
  };
  return (
    <>
      <div className="max-w-sm w-full lg:max-w-full lg:flex mt-4 hover:shadow-lg">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
          <img
            src={prop.course?.image}
            alt="course"
            className="h-full w-full object-cover text-gray-700"
            draggable="false"
          />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {prop.course?.title}
            </div>
            <p className="text-gray-700 text-base">
              {prop.course?.description}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {user?.image ? (
                <Avatar
                  size="large"
                  src={<img src={user?.image} alt="avatar" />}
                />
              ) : (
                <Avatar size="large" icon={<UserOutlined />}></Avatar>
              )}

              <div className="text-sm">
                <p className="text-gray-900 leading-none">{user?.name}</p>
                <p className="text-gray-600">{prop.course?.poststart}</p>
              </div>
            </div>
            <div>
              {prop.course?.isEnrolled ? (
                <Button disabled>Enrolled</Button>
              ) : (
                <Button
                  icon={<RightCircleOutlined />}
                  onClick={() => setIsShowEnroll(true)}
                >
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="ENROLL COURSE"
        open={isShowEnroll}
        onOk={() => enrollForCourse()}
        onCancel={() => clearEnrollData()}
        centered
        maskClosable={false}
        width={550}
        footer={[
          <Button key="back" onClick={() => clearEnrollData()}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => enrollForCourse()}>
            Apply
          </Button>,
        ]}
      >
        <>
          {loading && <CustomLoading />}
          <div className="flex gap-4 items-center mb-6 mt-4">
            <div>
              {prop.course?.image ? (
                <Avatar
                  shape="square"
                  size={90}
                  src={<img src={prop.course?.image} alt="avatar" />}
                />
              ) : (
                <Avatar
                  shape="square"
                  size={90}
                  icon={<FileImageOutlined />}
                ></Avatar>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{prop.course?.title}</h3>
              <p className="text-sm text-gray-600">
                {prop.course?.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* experience year, other mail */}
            <div className="flex gap-3 mb-5">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-base text-gray-500">
                  Remark
                </label>
                <TextArea
                  rows={4}
                  value={enrollData.remark}
                  onChange={(e) =>
                    setEnrollData({ ...enrollData, remark: e.target.value })
                  }
                  count={200}
                  style={{
                    resize: "none",
                  }}
                  showCount={true}
                  maxLength={200}
                />
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default CourseCard;
