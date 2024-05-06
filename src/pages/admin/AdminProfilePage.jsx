import { Avatar, Button, Tooltip } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  HomeOutlined,
  TwitterOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Experience, Skills } from "../../data/profile.data";

import ExperienceCard from "../../components/profile/ExperienceCard";
import SkillCard from "../../components/profile/SkillCard";
import { useState } from "react";

const AdminProfilePage = () => {
  const [loggedInUser] = useState("consultant");
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar
              size={64}
              src={
                <img
                  src={
                    "https://res.cloudinary.com/dx1pvvqg7/image/upload/v1694811676/interview/profile_image/file_v2xxfy.jpg"
                  }
                  alt="avatar"
                />
              }
            />

            <div className="flex flex-col">
              <div className="text-xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-2xl dark:text-black">
                Nimna Thiranjaya
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">
                  <PhoneOutlined /> 077 123 4567
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  <MailOutlined /> nimna@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="primary" icon={<EditOutlined />} ghost>
              Edit Profile
            </Button>
            <Button type="primary" danger icon={<LogoutOutlined />} ghost>
              LogOut
            </Button>
          </div>
        </div>
      </div>

      {loggedInUser === "consultant" && (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
            style={{ height: "400px" }}
          >
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Contact Information
              </h5>

              <Tooltip title="Add Contact Information" placement="right">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div className="flex flex-col gap-3">
                <span className="text-base font-semibold text-gray-500">
                  <PhoneOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; 077 123 4567
                </span>

                <span className="text-base font-semibold text-gray-500">
                  <MailOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; nimna@gmail.com
                </span>

                {/* Facebook */}
                <span className="text-base font-semibold text-gray-500">
                  <FacebookOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; nimna Thiranjaya
                </span>

                {/* LinkedIn */}
                <span className="text-base font-semibold text-gray-500">
                  <LinkedinOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; nimna Thiranjaya
                </span>

                {/* Twitter */}
                <span className="text-base font-semibold text-gray-500">
                  <TwitterOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; nimna Thiranjaya
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Work Experience
              </h5>

              <Tooltip title="Add Work Experience" placement="right">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div
                className="overflow-hidden overflow-y-scroll"
                style={{ height: "300px" }}
              >
                {Experience.map((experience) => (
                  <ExperienceCard
                    experience={experience}
                    key={experience._id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Expertise
              </h5>

              <Tooltip title="Add Expertise" placement="right">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div
                className="overflow-hidden overflow-y-scroll"
                style={{ height: "300px" }}
              >
                {Skills.map((skill) => (
                  <SkillCard skill={skill} key={skill._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loggedInUser === "employee" && (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
            style={{ height: "400px" }}
          >
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Company Information
              </h5>

              <Tooltip title="Add Company Information" placement="right">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div className="flex flex-col gap-3">
                <span className="text-base font-semibold text-gray-500">
                  <HomeOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; Intahub Private Limited
                </span>

                <span className="text-base font-semibold text-gray-500">
                  <PhoneOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; 077 123 4567
                </span>

                <span className="text-base font-semibold text-gray-500">
                  <PushpinOutlined
                    style={{ fontSize: "1.2rem", color: "#1890ff" }}
                  />
                  &nbsp; Gampaha
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfilePage;
