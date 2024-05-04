import { useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  DatePicker,
  Tooltip,
  Checkbox,
  Rate,
} from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Education, Experience, Skills } from "../../data/profile.data";
import EducationCard from "../../components/profile/EducationCard";
import SkillCard from "../../components/profile/SkillCard";
import ExperienceCard from "../../components/profile/ExperienceCard";

const UserProfile = () => {
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);

  return (
    <>
      <div className="px-6 py-1">
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

        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
            style={{ height: "400px" }}
          >
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Education
              </h5>

              <Tooltip title="Add Education" placement="right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddEdu(!showAddEdu)}
                ></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2">
              <div
                className="overflow-hidden overflow-y-scroll"
                style={{ height: "300px" }}
              >
                {Education.map((education) => (
                  <EducationCard education={education} key={education._id} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Work Experience
              </h5>

              <Tooltip title="Add Work Experience" placement="right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddExp(!showAddExp)}
                ></Button>
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
                Skills & Endorsements
              </h5>

              <Tooltip title="Add Skills" placement="right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddSkill(!showAddSkill)}
                ></Button>
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
      </div>

      {/* Add Education Modal */}
      <Modal
        title="ADD EDUCATION"
        open={showAddEdu}
        onOk={() => setShowAddEdu(false)}
        onCancel={() => setShowAddEdu(false)}
        centered
        width={500}
        maskClosable={false}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Institute
            </label>
            <Input placeholder="Institute" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Degree
            </label>
            <Input placeholder="Degree" />
          </div>
          {/* start year and end year same collom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Start Year
              </label>
              <DatePicker picker="year" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                End Year
              </label>
              <DatePicker picker="year" />
            </div>

            <div className="flex gap-1">
              <Checkbox>Is Present</Checkbox>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add  Experience Model*/}

      <Modal
        title="ADD EXPERIENCE"
        open={showAddExp}
        onOk={() => setShowAddExp(false)}
        onCancel={() => setShowAddExp(false)}
        centered
        width={500}
        maskClosable={false}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Institute
            </label>
            <Input placeholder="Institute" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Degree
            </label>
            <Input placeholder="Degree" />
          </div>
          {/* start year and end year same collom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Start Year
              </label>
              <DatePicker picker="year" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500">
                End Year
              </label>
              <DatePicker picker="year" />
            </div>

            <div className="flex gap-1">
              <Checkbox>Is Present</Checkbox>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Skill Modal */}

      <Modal
        title="ADD SKILL"
        open={showAddSkill}
        onOk={() => setShowAddSkill(false)}
        onCancel={() => setShowAddSkill(false)}
        centered
        width={500}
        maskClosable={false}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Skill Name
            </label>
            <Input placeholder="Institute" />
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-base text-gray-500 required">
              Level
            </label>
            <Rate allowHalf style={{ fontSize: "20px" }} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
