import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  DatePicker,
  Tooltip,
  Checkbox,
  Rate,
  Popconfirm,
} from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  UserOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// import { Education, Experience, Skills } from "../../data/profile.data";
import EducationCard from "../../components/profile/EducationCard";
import SkillCard from "../../components/profile/SkillCard";
import ExperienceCard from "../../components/profile/ExperienceCard";
import { useAuth } from "../../shared/context/AuthContext";
import PropTypes from "prop-types";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";
import uploadImageToCloudinary from "../../shared/cloudinaryUpload.service";
import { CustomToastService } from "../../shared/message.service";
import { LocalStorageService } from "../../shared/localStorage.service";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // update profile details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [uploadProfileImage, setProfileImage] = useState(null);

  const { authUser, setUser } = useAuth();
  const { loading, axiosInstance } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  useEffect(() => {
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/user/get/${authUser.userId}`);

      if (response.data) {
        setLoggedInUser(response.data);
        setEducations(response.data.education);
        setExperiences(response.data.experience);
        setSkills(response.data.skills);
        setName(response.data.name);
        setPhone(response.data.phone);
        setDob(response.data.dob);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update User Details
  const updateUserDetails = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      phone: phone,
      dob: dob,
    };

    const validationErrors = validateUserDetails(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    if (uploadProfileImage) {
      const imageUrl = await uploadImageToCloudinary(
        uploadProfileImage,
        "TestFold",
        axiosInstance
      );

      data = { ...data, image: imageUrl };
    }

    try {
      const response = await axiosInstance.put(
        `/user/update/${authUser.userId}`,
        data
      );

      if (response.data) {
        setProfileImage(null);
        CustomToastService.success(response.data.message);
        setShowEditUser(false);
        fetchUserDetails();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // clear user details
  const clearUserDetails = () => {
    setName(loggedInUser?.name);
    setPhone(loggedInUser?.phone);
    setDob(loggedInUser?.dob);
    setProfileImage(null);
    setErrors({});
  };

  // Logout
  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
    navigate("/signIn");
  };

  // Add Education
  const addEducation = async (e) => {
    e.preventDefault();

    const validationErrors = validateEducation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    if (formData.startYear > formData.endYear) {
      CustomToastService.error("Start year should be less than end year");
      return;
    }

    let request = {
      type: "education",
      data: {
        institute: formData.institute,
        degree: formData.degree,
        startYear: formData.startYear,
        endYear: formData.endYear,
        isPresent: formData.isPresent ? formData.isPresent : false,
      },
    };

    await addOption(request);
  };

  const addExperience = async (e) => {
    e.preventDefault();

    const validationErrors = validateExperience(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    if (formData.startYear > formData.endYear) {
      CustomToastService.error("Start year should be less than end year");
      return;
    }

    let request = {
      type: "experience",
      data: {
        position: formData.position,
        company: formData.company,
        startYear: formData.startYear,
        endYear: formData.endYear,
        isPresent: formData.isPresent ? formData.isPresent : false,
      },
    };

    await addOption(request);
  };

  const addSkill = async (e) => {
    e.preventDefault();

    const validationErrors = validateSkill(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      type: "skills",
      data: {
        name: formData.name,
        level: formData.level,
      },
    };

    console.log(request);
    await addOption(request);
  };

  const clearFormData = () => {
    setFormData({});
    setErrors({});
    setShowAddEdu(false);
    setShowAddExp(false);
    setShowAddSkill(false);
  };

  const addOption = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/user/addOption/${authUser.userId}`,
        data
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        clearFormData();
        fetchUserDetails();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const deleteOption = async (type, id) => {
    let request = {
      type: type,
      id: id,
    };

    try {
      const response = await axiosInstance.put(
        `/user/deleteOption/${authUser.userId}`,
        request
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        fetchUserDetails();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Validations
  const validateUserDetails = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = true;
    }

    if (!data.phone || data.phone === "") {
      errors.phone = true;
    }

    if (data.dob === null || data.dob === "") {
      errors.dob = true;
    }

    return errors;
  };

  const validateEducation = (data) => {
    const errors = {};
    if (!data.institute || data.institute === "") {
      errors.institute = true;
    }

    if (!data.degree || data.degree === "") {
      errors.degree = true;
    }

    if (!data.startYear || data.startYear === "") {
      errors.startYear = true;
    }

    if (!data.endYear || data.endYear === "") {
      errors.endYear = true;
    }

    return errors;
  };

  // Validate Experience
  const validateExperience = (data) => {
    const errors = {};
    if (!data.position || data.position === "") {
      errors.position = true;
    }

    if (!data.company || data.company === "") {
      errors.company = true;
    }

    if (!data.startYear || data.startYear === "") {
      errors.startYear = true;
    }

    return errors;
  };

  const validateSkill = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = true;
    }

    if (!data.level || data.level === "") {
      errors.level = true;
    }

    return errors;
  };

  return (
    <>
      {loading &&
        !showEditUser &&
        !showAddEdu &&
        !showAddExp &&
        !showAddSkill && <CustomLoading />}
      <div className="px-6 py-1">
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
          <div className="px-6 py-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {loggedInUser?.image != "user" ? (
                <Avatar
                  size={64}
                  src={<img src={loggedInUser?.image} alt="avatar" />}
                />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}

              <div className="flex flex-col">
                <div className="text-xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-2xl dark:text-black">
                  {loggedInUser?.name}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500">
                    <PhoneOutlined /> {loggedInUser?.phone}
                  </span>

                  <span className="text-sm font-semibold text-gray-500">
                    <MailOutlined /> {loggedInUser?.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                icon={<EditOutlined />}
                ghost
                onClick={() => setShowEditUser(!showEditUser)}
              >
                Edit Profile
              </Button>
              <Popconfirm
                title="Logout Confirmation"
                description="Are you sure to logout?"
                onConfirm={logout}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
                placement="bottomLeft"
              >
                <Button type="primary" danger icon={<LogoutOutlined />} ghost>
                  LogOut
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 mb-6">
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
                {educations.length === 0 && <DataNotFound name={"Education"} />}

                {educations.map((education) => (
                  <EducationCard
                    education={education}
                    key={education?.id}
                    onDelete={deleteOption}
                  />
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
                {experiences.length === 0 && (
                  <DataNotFound name={"Work Experience"} />
                )}

                {experiences.map((experience) => (
                  <ExperienceCard
                    experience={experience}
                    key={experience.id}
                    onDelete={deleteOption}
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
                {skills.length === 0 && <DataNotFound name={"Skills"} />}

                {skills.map((skill) => (
                  <SkillCard
                    skill={skill}
                    key={skill.id}
                    onDelete={deleteOption}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Details */}
      <Modal
        title="EDIT USER DETAILS"
        open={showEditUser}
        onOk={updateUserDetails}
        onCancel={() => {
          setShowEditUser(false);
          clearUserDetails();
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Full Name
            </label>
            <Input
              placeholder="Full Name"
              value={name}
              id="name"
              status={errors.name && "error"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Email
              </label>
              <Input
                placeholder="email"
                readOnly
                value={loggedInUser?.email}
                id="email"
                status={errors.email && "error"}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Date of Birth
              </label>
              <DatePicker
                defaultValue={dayjs(dob, "YYYY-MM-DD")}
                id="dob"
                status={errors.dob && "error"}
                onChange={(date, dateString) => setDob(dateString)}
              />
            </div>
          </div>
          {/* start year and end year same collom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Phone Number"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 12);
                }}
                value={phone}
                id="phone"
                status={errors.phone && "error"}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500">
                Profile Image
              </label>
              <Input
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Education Modal */}
      <Modal
        title="ADD EDUCATION"
        open={showAddEdu}
        onOk={addEducation}
        onCancel={() => clearFormData()}
        centered
        width={500}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Institute
            </label>
            <Input
              placeholder="Institute"
              id="institute"
              onChange={handleChange}
              value={formData.institute}
              status={errors.institute && "error"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Degree
            </label>
            <Input
              placeholder="Degree"
              id="degree"
              onChange={handleChange}
              value={formData.degree}
              status={errors.degree && "error"}
            />
          </div>
          {/* start year and end year same collom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Start Year
              </label>
              <DatePicker
                picker="year"
                id="startYear"
                onChange={(date, dateString) =>
                  setFormData({ ...formData, startYear: dateString })
                }
                status={errors.startYear && "error"}
                value={
                  formData.startYear
                    ? dayjs(formData.startYear, "YYYY")
                    : undefined
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                End Year
              </label>
              <DatePicker
                picker="year"
                id="endYear"
                onChange={(date, dateString) =>
                  setFormData({ ...formData, endYear: dateString })
                }
                value={
                  formData.endYear ? dayjs(formData.endYear, "YYYY") : undefined
                }
                status={errors.endYear && "error"}
              />
            </div>

            <div className="flex gap-1">
              <Checkbox
                id="isPresent"
                defaultChecked={false}
                onChange={(e) => {
                  setFormData({ ...formData, isPresent: e.target.checked });
                }}
                value={formData.isPresent}
              >
                Is Present
              </Checkbox>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add  Experience Model*/}

      <Modal
        title="ADD EXPERIENCE"
        open={showAddExp}
        onOk={addExperience}
        onCancel={() => setShowAddExp(false)}
        centered
        width={500}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Position
            </label>
            <Input
              placeholder="Position"
              id="position"
              onChange={handleChange}
              value={formData.position}
              status={errors.position && "error"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Company
            </label>
            <Input
              placeholder="Company"
              id="company"
              onChange={handleChange}
              value={formData.company}
              status={errors.company && "error"}
            />
          </div>
          {/* start year and end year same collom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500 required">
                Start Year
              </label>
              <DatePicker
                picker="year"
                id="startYear"
                onChange={(date, dateString) =>
                  setFormData({ ...formData, startYear: dateString })
                }
                status={errors.startYear && "error"}
                value={
                  formData.startYear
                    ? dayjs(formData.startYear, "YYYY")
                    : undefined
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500">
                End Year
              </label>
              <DatePicker
                picker="year"
                id="endYear"
                onChange={(date, dateString) =>
                  setFormData({ ...formData, endYear: dateString })
                }
                value={
                  formData.endYear ? dayjs(formData.endYear, "YYYY") : undefined
                }
                status={errors.endYear && "error"}
              />
            </div>

            <div className="flex gap-1">
              <Checkbox
                id="isPresent"
                defaultChecked={false}
                onChange={(e) => {
                  setFormData({ ...formData, isPresent: e.target.checked });
                }}
              >
                Is Present
              </Checkbox>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Skill Modal */}

      <Modal
        title="ADD SKILL"
        open={showAddSkill}
        onOk={addSkill}
        onCancel={() => clearFormData()}
        centered
        width={500}
        maskClosable={false}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Skill Name
            </label>
            <Input
              placeholder="Skill Name"
              id="name"
              onChange={handleChange}
              value={formData.name}
              status={errors.name && "error"}
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-base text-gray-500 required">
              Level
            </label>
            <Rate
              allowHalf
              style={{ fontSize: "20px" }}
              id="level"
              onChange={(value) => setFormData({ ...formData, level: value })}
              value={formData.level}
            />
            {errors.level && (
              <p className="text-red-500 text-xs">Level is required</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;

const DataNotFound = ({ name }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500">No {name} Found</p>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string,
};
