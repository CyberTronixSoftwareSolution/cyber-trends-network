import { LuGraduationCap, LuUsers2 } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

import { Avatar, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SideBar = (prop) => {
  const navigate = useNavigate();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={prop.collapsed}
      style={{
        padding: "0 10px 0 10px",
        width: "250px",
      }}
    >
      {prop.collapsed ? (
        <>
          {" "}
          <div className="flex items-center flex-col mt-4 mb-5">
            <Avatar
              size={40}
              src="https://res.cloudinary.com/dx1pvvqg7/image/upload/v1694811676/interview/profile_image/file_v2xxfy.jpg"
            />
          </div>
        </>
      ) : (
        <>
          {/* Add avatar and logged user name  */}
          <div className="flex items-center flex-col mt-4 mb-5">
            <Avatar
              size={64}
              src="https://res.cloudinary.com/dx1pvvqg7/image/upload/v1694811676/interview/profile_image/file_v2xxfy.jpg"
            />

            <div className="text-base font-bold leading-none tracking-tight text-white mt-5">
              Nimna Thiranjaya
            </div>

            <div className="text-sm font-semibold text-gray-300 mt-3">
              Role : Admin
            </div>

            {/* divider */}

            <div className="w-full h-0.5 bg-gray-600 mt-3"></div>
          </div>
        </>
      )}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[
          {
            key: "0",
            icon: <AiOutlineDashboard style={{ fontSize: "1.2rem" }} />,
            label: "Dashboard",
            onClick: () => {
              navigate("/admin");
            },
          },
          {
            key: "1",
            icon: <LuUsers2 style={{ fontSize: "1.2rem" }} />,
            label: "Users",
            onClick: () => {
              navigate("/admin/users");
            },
          },

          {
            key: "2",
            icon: <LuGraduationCap style={{ fontSize: "1.2rem" }} />,
            label: "Courses",
            onClick: () => {
              navigate("/admin/courses");
            },
          },
          {
            key: "3",
            icon: <IoBriefcaseOutline style={{ fontSize: "1.2rem" }} />,
            label: "Jobs",
            onClick: () => {
              navigate("/admin/jobs");
            },
          },
          {
            key: "4",
            icon: <MdSupportAgent style={{ fontSize: "1.2rem" }} />,
            label: "Services",
            onClick: () => {
              navigate("/admin/services");
            },
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;