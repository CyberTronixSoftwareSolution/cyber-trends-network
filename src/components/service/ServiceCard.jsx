import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const ServiceCard = (prop) => {
  const [usersSkill, setUsersSkill] = useState("");

  useEffect(() => {
    if (prop.service?.addedUser?.expertise.length > 0) {
      let skills = "";
      prop.service?.addedUser?.expertise.map((skill) => {
        skills += skill.name + ", ";
      });

      setUsersSkill(skills.slice(0, -2));
    }
  }, [prop.service]);
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl hover:shadow-lg">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {prop.service?.title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {prop.service?.description}
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2 align-middle">
            {prop.service?.addedUser?.image ? (
              <Avatar
                size={40}
                src={<img src={prop.service?.addedUser?.image} alt="avatar" />}
              />
            ) : (
              <Avatar size={40} icon={<UserOutlined />}></Avatar>
            )}

            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {prop.service?.addedUser?.name}
              </p>
              <p className="text-gray-600">{usersSkill}</p>
            </div>
          </div>
          {/* <Button icon={<RightCircleOutlined />}>Hire Now</Button> */}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
