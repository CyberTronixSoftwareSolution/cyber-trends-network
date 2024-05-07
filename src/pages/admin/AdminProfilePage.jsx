import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Rate,
  Tooltip,
} from "antd";
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
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegBuilding } from "react-icons/fa";

import PropTypes from "prop-types";
import ExperienceCard from "../../components/profile/ExperienceCard";
import SkillCard from "../../components/profile/SkillCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../shared/localStorage.service";
import CustomLoading from "../../components/CustomLoading";
import uploadImageToCloudinary from "../../shared/cloudinaryUpload.service";
import { CustomToastService } from "../../shared/message.service";
import dayjs from "dayjs";

const AdminProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showContactInformation, setShowContactInformation] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [companyInformation, setCompanyInformation] = useState(null);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  //   profile details
  const [uploadProfileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  //   For company Information
  const [companyData, setCompanyData] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  //   For contact Informatoin
  const [contactInformation, setContactInformation] = useState({
    phone: "",
    email: "",
    facebook: "",
    linkedIn: "",
    twitter: "",
  });

  const { authUser, setUser } = useAuth();
  const { loading, axiosInstance } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setLoggedInUserRole(authUser.role);
      getUserProfile();
    }
  }, [authUser]);

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get/${authUser.userId}`);
      if (response.data) {
        setLoggedInUser(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);

        if (response.data.workExperience) {
          setExperiences(response.data.workExperience);
        }

        if (response.data.expertise) {
          setSkills(response.data.expertise);
        }

        if (response.data.contactInformation) {
          setContactInformation(response.data.contactInformation);
        }

        if (loggedInUserRole === "Employee") {
          setCompanyInformation(response.data.companyInformation);
          setCompanyData({
            name: response.data?.companyInformation?.name,
            phone: response.data?.companyInformation?.phone,
            address: response.data?.companyInformation?.address,
            image: response.data?.companyInformation?.image,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Update USer details
  const updateUserDetails = async () => {
    let data = {
      name: name,
      phone: phone,
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
        `/admin/update/${authUser.userId}`,
        data
      );

      if (response.data) {
        setProfileImage(null);
        CustomToastService.success(response.data.message);
        setShowEditProfile(false);
        getUserProfile();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Update COntact Information
  const updateContactInformation = async () => {
    const validationErrors = validateContactInformation(contactInformation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      type: "contactInformation",
      data: contactInformation,
    };

    await updateOptions(request);
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
      type: "workExperience",
      data: {
        position: formData.position,
        company: formData.company,
        startYear: formData.startYear,
        endYear: formData.endYear,
        isPresent: formData.isPresent ? formData.isPresent : false,
      },
    };

    await updateOptions(request);
  };

  // Update options
  const updateOptions = async (request) => {
    try {
      const response = await axiosInstance.put(
        `/admin/addDetail/${authUser.userId}`,
        request
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        clearContactInformation();
        clearFormData();
        setShowContactInformation(false);
        getUserProfile();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  //   Delete Option
  const deleteOption = async (type, id) => {
    let request = {
      type: type,
      id: id,
    };

    try {
      const response = await axiosInstance.put(
        `/admin/deleteDetail/${authUser.userId}`,
        request
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        getUserProfile();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  //   Add Expetise
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
      type: "expertise",
      data: {
        name: formData.name,
        level: formData.level,
      },
    };

    await updateOptions(request);
  };

  // Add Company Information
  const addCompanyInformation = async () => {
    const validationErrors = validateCompany(companyData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request = {
      companyInformation: companyData,
    };

    if (companyData.image) {
      const imageUrl = await uploadImageToCloudinary(
        companyData.image,
        "TestFold",
        axiosInstance
      );

      request.companyInformation.image = imageUrl;
    }

    try {
      const response = await axiosInstance.put(
        `/admin/update/${authUser.userId}`,
        request
      );

      if (response.data) {
        setProfileImage(null);
        CustomToastService.success("Company Information added successfully");
        setShowEditProfile(false);
        getUserProfile();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const clearFormData = () => {
    setFormData({});
    setErrors({});

    setShowAddExp(false);
    setShowAddSkill(false);
    setShowAddCompany(false);
  };

  //  clear contact Information
  const clearContactInformation = () => {
    setContactInformation({
      phone: "",
      email: "",
      facebook: "",
      linkedIn: "",
      twitter: "",
    });
  };

  // clear user details
  const clearUserDetails = () => {
    setName(loggedInUser?.name);
    setPhone(loggedInUser?.phone);
    setProfileImage(null);
    setErrors({});
  };

  // Logout
  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
    navigate("/admin");
  };

  //   Validations
  // User details validation
  const validateUserDetails = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = true;
    }

    if (!data.phone || data.phone === "") {
      errors.phone = true;
    }

    return errors;
  };

  //   Validate Contact Information
  const validateContactInformation = (data) => {
    const errors = {};
    if (!data.phone || data.phone === "") {
      errors.phone = true;
    }

    if (!data.email || data.email === "") {
      errors.email = true;
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

  //   Validate company
  const validateCompany = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = true;
    }

    if (!data.address || data.address === "") {
      errors.address = true;
    }

    if (!data.phone || data.phone === "") {
      errors.phone = true;
    }

    return errors;
  };
  return (
    <>
      {loading && <CustomLoading />}
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {loggedInUser?.image != "" ? (
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
              onClick={() => setShowEditProfile(true)}
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

      {loggedInUserRole === "Consultant" && (
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
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setShowContactInformation(true)}
                ></Button>
              </Tooltip>
            </div>
            <div
              className="px-6 py-2 overflow-hidden overflow-y-scroll"
              style={{ height: "250px" }}
            >
              {!loggedInUser?.contactInformation?.phone ? (
                <DataNotFound name="Contact Information" />
              ) : (
                <div className="flex flex-col gap-3">
                  <span className="text-base font-semibold text-gray-500">
                    <PhoneOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp;{" "}
                    {loggedInUser?.contactInformation?.phone
                      ? loggedInUser?.contactInformation?.phone
                      : "-"}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <MailOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp;{" "}
                    {loggedInUser?.contactInformation?.email
                      ? loggedInUser?.contactInformation?.email
                      : "-"}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <FacebookOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp;{" "}
                    {loggedInUser?.contactInformation?.facebook
                      ? loggedInUser?.contactInformation?.facebook
                      : "-"}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <LinkedinOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp;{" "}
                    {loggedInUser?.contactInformation?.linkedIn
                      ? loggedInUser?.contactInformation?.linkedIn
                      : "-"}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <TwitterOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp;{" "}
                    {loggedInUser?.contactInformation?.twitter
                      ? loggedInUser?.contactInformation?.twitter
                      : "-"}
                  </span>
                </div>
              )}
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
                  onClick={() => setShowAddExp(true)}
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
                    isAdmin={true}
                    onDelete={deleteOption}
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
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddSkill(true)}
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
                    isAdmin={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loggedInUserRole === "Employee" && (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
            style={{ height: "300px" }}
          >
            <div className="p-6 flex justify-between items-center">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Company Information
              </h5>

              <Tooltip title="Add Company Information" placement="right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddCompany(true)}
                ></Button>
              </Tooltip>
            </div>
            <div className="px-6 py-2" style={{ height: "250px" }}>
              {companyInformation ? (
                <div className="flex flex-col gap-3">
                  {companyInformation?.image ? (
                    <Avatar
                      size={64}
                      src={<img src={companyInformation?.image} alt="avatar" />}
                    />
                  ) : (
                    <Avatar size={64} icon={<FaRegBuilding />} />
                  )}
                  <span className="text-base font-semibold text-gray-500">
                    <HomeOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp; {companyInformation?.name}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <PhoneOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp; {companyInformation?.phone}
                  </span>

                  <span className="text-base font-semibold text-gray-500">
                    <PushpinOutlined
                      style={{ fontSize: "1.2rem", color: "#1890ff" }}
                    />
                    &nbsp; {companyInformation?.address}
                  </span>
                </div>
              ) : (
                <DataNotFound name="Company Information" />
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        title="EDIT USER DETAILS"
        open={showEditProfile}
        onOk={updateUserDetails}
        onCancel={() => {
          setShowEditProfile(false);
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
              id="name"
              status={errors.name && "error"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
                id="phone"
                status={errors.phone && "error"}
                value={phone}
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

      <Modal
        title="EDIT CONTACT INFORMATION"
        open={showContactInformation}
        onOk={updateContactInformation}
        onCancel={() => {
          setShowContactInformation(false);
        }}
        centered
        width={400}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            {/* Phone */}
            <label className="text-sm font-base text-gray-500 required">
              Phone Number
            </label>

            <Input
              placeholder="Phone Number"
              id="phone"
              status={errors.phone && "error"}
              value={contactInformation.phone}
              onChange={(e) =>
                setContactInformation({
                  ...contactInformation,
                  phone: e.target.value,
                })
              }
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 12);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Email
            </label>

            <Input
              placeholder="Email"
              id="email"
              status={errors.email && "error"}
              value={contactInformation.email}
              onChange={(e) =>
                setContactInformation({
                  ...contactInformation,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500">Facebook</label>

            <Input
              placeholder="Facebook"
              id="facebook"
              status={errors.facebook && "error"}
              value={contactInformation.facebook}
              onChange={(e) =>
                setContactInformation({
                  ...contactInformation,
                  facebook: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 ">LinkedIn</label>

            <Input
              placeholder="LinkedIn"
              id="linkedIn"
              status={errors.linkedIn && "error"}
              value={contactInformation.linkedIn}
              onChange={(e) =>
                setContactInformation({
                  ...contactInformation,
                  linkedIn: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500">Twitter</label>

            <Input
              placeholder="Twitter"
              id="twitter"
              status={errors.twitter && "error"}
              value={contactInformation.twitter}
              onChange={(e) =>
                setContactInformation({
                  ...contactInformation,
                  twitter: e.target.value,
                })
              }
            />
          </div>
        </div>
      </Modal>

      {/* Add  Experience Model*/}

      <Modal
        title="ADD EXPERIENCE"
        open={showAddExp}
        onOk={addExperience}
        onCancel={() => {
          setShowAddExp(false);
          setFormData({});
        }}
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

      {/* Add COmpany Informations */}
      <Modal
        title="ADD COMPANY INFORMATION"
        open={showAddCompany}
        onOk={addCompanyInformation}
        onCancel={() => {
          setShowAddCompany(false);
          setCompanyData({
            name: "",
            phone: "",
            address: "",
            image: "",
          });
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {loading && <CustomLoading />}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Name
            </label>
            <Input
              placeholder="Company Name"
              id="name"
              status={errors.name && "error"}
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-base text-gray-500 required">
              Address
            </label>
            <Input
              placeholder="Company Address"
              id="address"
              status={errors.address && "error"}
              value={companyData.address}
              onChange={(e) =>
                setCompanyData({ ...companyData, address: e.target.value })
              }
            />
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
                id="phone"
                status={errors.phone && "error"}
                value={companyData.phone}
                onChange={(e) =>
                  setCompanyData({ ...companyData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-base text-gray-500">
                Profile Image
              </label>
              <Input
                type="file"
                // onChange={(e) => setProfileImage(e.target.files[0])}
                onChange={(e) =>
                  setCompanyData({ ...companyData, image: e.target.files[0] })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminProfilePage;

const DataNotFound = ({ name }) => {
  return (
    <div className="flex flex-col justify-center align-middle items-center h-full">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500 text-center">No {name} Found</p>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string,
};
