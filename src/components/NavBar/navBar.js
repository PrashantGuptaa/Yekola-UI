import {  useEffect, useState } from "react";
import { Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/yekola.png";
import "./navBar.css";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    if(location.pathname.includes('class-room')) {

      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location.pathname]);

  useEffect(()=> {
    setProfile(localStorage.getItem('profile'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('profile')]);

  const userItems = [
    {
      label: "Profile",
      key: "Profile",
    },{
      label: "LogOut",
      key: "logout",
    },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "Profile":
        return navigate(`/profile?email=${localStorage.getItem('email')}`)
      default:
        localStorage.clear("authToken");
        localStorage.clear("profile");
        localStorage.clear("name");
        localStorage.clear("role");
        localStorage.clear("email");
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
              { <Avatar
                size="large"
                className="cursor-pointer"
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
                src={profile}
              />}
            </Dropdown>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavBar;
