import { Avatar, Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

const CourseCard = (prop) => {
  return (
    <>
      <div className="max-w-sm w-full lg:max-w-full lg:flex mt-4 hover:shadow-lg">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
          <img
            src={prop.course.image}
            alt="course"
            className="h-full w-full object-cover text-gray-700"
            draggable="false"
          />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {prop.course.title}
            </div>
            <p className="text-gray-700 text-base">{prop.course.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar
                size="large"
                src={<img src={prop.course.lecImage} alt="avatar" />}
              />

              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {prop.course.lecName}
                </p>
                <p className="text-gray-600">{prop.course.corseStart}</p>
              </div>
            </div>
            <div>
              <Button icon={<RightCircleOutlined />}>Enroll Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
