import { Spin } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_VALIDATION_ENDPOINT } from "../../configs/apiEndpoints";
import HttpServices from "../../configs/https.service";
import { get } from 'lodash';

const Authentication = (ServedComponent) => {
  const UserValidation = () => {
    const [iseUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    useEffect(() => {
      isUserAuthenticated();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isUserAuthenticated = async () => {
      if (!token) {
        navigateUserToLogin();
        return;
      }
      checkTokenValidation();
    };

    const checkTokenValidation = async () => {
      try {
        const response = await HttpServices.getRequest(
          USER_VALIDATION_ENDPOINT
        );
        console.log("F-4", response); 
        if (get(response, ['data', 'authenticated'])) {
          setIsUserAuthenticated(true);
          return;
        }
        navigateUserToLogin();
      } catch (e) {
        console.error(e);
        navigateUserToLogin();
      }
    };

    const navigateUserToLogin = () => navigate("/sign-user");

    return (
      <>
        {iseUserAuthenticated ? (
          <ServedComponent />
        ) : (
          <div className="complete-center">
            <Spin tip="Loading..." size="large" />
          </div>
        )}
      </>
    );
  };
  return UserValidation;
};
export default Authentication;
