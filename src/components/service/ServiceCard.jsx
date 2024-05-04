import { Avatar, Button } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

const ServiceCard = (prop) => {
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl hover:shadow-lg">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {prop.service?.name}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {prop.service?.description}
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar
              size="large"
              src={<img src={prop.service?.lecImage} alt="avatar" />}
            />

            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {prop.service?.lecName}
              </p>
              <p className="text-gray-600">{prop.service?.lecSpecialization}</p>
            </div>
          </div>
          <Button icon={<RightCircleOutlined />}>Hire Now</Button>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
