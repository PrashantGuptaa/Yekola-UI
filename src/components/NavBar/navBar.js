import { Dropdown, message, Space, Avatar, Layout } from "antd";
// import logo from "../../assets/images/logo.jpeg";
import React from 'react';

import "./navBar.css";
import logo2 from "../../assets/images/logo2.png";
import logo from "../../assets/images/slogo.png";
import { useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
// import { DownOutlined } from '@ant-design/icons';
// import { Dropdown, message, Space } from 'antd';
const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate();
  const userItems = [
    {
      label: "Logout",
      key: "logout",
    },
  ];

  const onClick = ( {key} ) => {
    switch(key) {
      default:
        localStorage.clear('authToken');
        navigate('/sign-user');
    }
    console.log("F=4", key);
  }
  return (
    <Layout>
      <Header className="header">
        <div
          className="logo-container cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Yekola-Logo" className="logo" />
          {/* <span className="logo-name">YEKOLA</span> */}
        </div>
        <Dropdown
         placement="bottom" arrow
        trigger={["click"] }
          menu={{
            items: userItems,
            onClick,
          }}
        >
          
          <Avatar
            size="large"
            className="cursor-pointer"
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          {/* <h1>sfs</h1> */}
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default NavBar;
