import { Input, Avatar, Button, Menu, Tooltip, Dropdown } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  UserAddOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MdOutlineCastForEducation } from "react-icons/md";
import { RiBriefcase4Line } from "react-icons/ri";
import { SiConsul } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/userProfile">
        <a target="_blank" rel="noopener noreferrer">
          <UserOutlined /> Profile
        </a>
      </Link>
    </Menu.Item>

    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> LogOut
      </a>
    </Menu.Item>
  </Menu>
);

const UserHeader = () => {
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search...");
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const pathArr = path.split("/");
    let placeholder = "Search...";

    if (pathArr.includes("userJob")) {
      placeholder = "Search Jobs...";
    } else if (pathArr.includes("userCourse")) {
      placeholder = "Search Courses...";
    } else if (pathArr.includes("userService")) {
      placeholder = "Search Services...";
    }

    setSearchPlaceHolder(placeholder);
  }, [path]);

  return (
    <>
      <nav className="relative flex w-full bg-zinc-50 py-2 shadow-dark-mild dark:bg-violet-500 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <span className="text-xl text-black dark:text-white">
            <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-white">
              Cyber{" "}
              <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                Trends
              </mark>
            </h1>
          </span>
          <div className="flex items-center justify-end gap-2">
            <Tooltip placement="bottom" title={"Friends"}>
              <Button
                type="text"
                shape="circle"
                icon={<UserAddOutlined />}
                style={{ color: "white" }}
              />
            </Tooltip>

            <Tooltip placement="bottom" title={"Chat"}>
              <Button
                type="text"
                shape="circle"
                icon={<MessageOutlined />}
                style={{ color: "white" }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title={"Feedbacks"}>
              <Button
                type="text"
                shape="circle"
                icon={<VscFeedback />}
                style={{ color: "white", fontSize: "1.2rem" }}
              />
            </Tooltip>
            <Input
              placeholder={searchPlaceHolder}
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              className="rounded-full ml-2 mr-2"
            />
            <Tooltip placement="bottom" title={"Jobs"}>
              <Link to="/userJob">
                <Button
                  type="text"
                  shape="circle"
                  icon={<RiBriefcase4Line />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Link>
            </Tooltip>
            <Link to="/userCourse">
              <Tooltip placement="bottom" title={"Courses"}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<MdOutlineCastForEducation />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Tooltip>
            </Link>
            <Link to="/userService">
              <Tooltip placement="bottom" title={"Services"}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<SiConsul />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Tooltip>
            </Link>
          </div>

          <Dropdown overlay={menu} placement="bottomLeft">
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default UserHeader;
