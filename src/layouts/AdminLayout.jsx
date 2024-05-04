import { useState } from "react";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  theme,
  Breadcrumb,
  Menu,
  Dropdown,
  Avatar,
} from "antd";
import SideBar from "../components/sidebar/sidebar.jsx";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

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
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={
                collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
              }}
            />
            <div className="mr-3">
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                style={{
                  marginRight: "20px",
                }}
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Breadcrumb style={{ margin: "16px 24px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            margin: "0px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
