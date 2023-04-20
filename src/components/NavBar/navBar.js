import { Dropdown, Avatar } from "antd";
// import logo from "../../assets/images/logo.jpeg";
import React from "react";

import "./navBar.css";
import logo from "../../assets/images/slogo.png";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const NavBar = () => {
  const navigate = useNavigate();
  const userItems = [
    {
      label: "Logout",
      key: "logout",
    },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      default:
        localStorage.clear("authToken");
        navigate("/sign-user");
    }

  };
  return (
    <div className="header">
      <div
        className="logo-container cursor-pointer"
        onClick={() => navigate(`/home/room-list/English`)}
      >
        <img src={logo} alt="Yekola-Logo" className="logo" />
      </div>
      <div>
      <Dropdown
        placement="bottom"
        arrow
        trigger={["click"]}
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
      </Dropdown>
      </div>

    </div>
  );
};

export default NavBar;
