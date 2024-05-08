import { LuGraduationCap, LuUsers2 } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../CustomLoading";

const { Sider } = Layout;

const SideBar = (prop) => {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const pathArr = path.split("/");
    if (pathArr.includes("admin") && pathArr.includes("users")) {
      setDefaultSelectedKeys(1);
    } else if (pathArr.includes("admin") && pathArr.includes("jobs")) {
      setDefaultSelectedKeys(3);
    } else if (pathArr.includes("admin") && pathArr.includes("courses")) {
      setDefaultSelectedKeys(2);
    } else if (pathArr.includes("admin") && pathArr.includes("services")) {
      setDefaultSelectedKeys(4);
    } else if (pathArr.includes("admin") && pathArr.includes("chat")) {
      setDefaultSelectedKeys(5);
    } else if (pathArr.includes("admin") && pathArr.includes("profile")) {
      setDefaultSelectedKeys(6);
    } else if (pathArr.includes("admin") && pathArr.includes("dashboard")) {
      setDefaultSelectedKeys(0);
    }

    if (authUser.userId) {
      getUser();
    }
  }, [defaultSelectedKeys, path, useAuth]);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get/${authUser.userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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
          {loading & <CustomLoading />}
          {user.image ? (
            <Avatar size={40} src={user.image} className="mt-4 mb-5" />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} className="mt-4 mb-5" />
          )}
        </>
      ) : (
        <>
          {/* Add avatar and logged user name  */}
          <div className="flex items-center flex-col mt-4 mb-5">
            {user?.image ? (
              <Avatar size={60} src={user?.image} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />}></Avatar>
            )}
            <div className="text-base font-bold leading-none tracking-tight text-white mt-5">
              {user?.name}
            </div>

            <div className="text-sm font-semibold text-gray-300 mt-3">
              Role : {user?.type}
            </div>

            {/* divider */}

            <div className="w-full h-0.5 bg-gray-600 mt-3"></div>
          </div>
        </>
      )}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[defaultSelectedKeys.toString()]}
        items={[
          {
            key: "0",
            icon: <AiOutlineDashboard style={{ fontSize: "1.2rem" }} />,
            label: "Dashboard",
            onClick: () => {
              navigate("/admin/dashboard");
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
          {
            key: "5",
            icon: <IoChatbubblesOutline style={{ fontSize: "1.2rem" }} />,
            label: "Messenger",
            onClick: () => {
              navigate("/admin/chat");
            },
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
