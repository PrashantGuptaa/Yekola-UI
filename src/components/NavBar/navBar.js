import { Dropdown, Avatar } from "antd";
// import logo from "../../assets/images/logo.jpeg";
import React, {  useEffect, useState } from "react";

import "./navBar.css";
import logo from "../../assets/images/yekola.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    if(location.pathname.includes('class-room')) {

      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location.pathname]);

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
    <>
      {showNavBar ? (
        <div className="header">
          <div
            className="logo-container cursor-pointer"
            onClick={() => navigate(`/home/room-list/Yekola`)}
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
      ) : null}
    </>
  );
};

export default NavBar;
