import { Form, Button, message, Checkbox } from "antd";
import InputWithLabel from "../../components/InputWithLabel";
import { useState, useEffect } from "react";
import HttpServices from "../../configs/https.service";
import {
  FETCH_ALL_ROLES_ENDPOINT,
  REGISTER_ENDPOINT,
} from "./../../configs/apiEndpoints";
import "./register.css";
import {
  userNamePolicy,
  passwordPolicy,
  rePasswordPolicy,
  rolesPolicy,
  emailPolicy,
} from "../../utils/userSignPolicies";
import { EMPTY_FIELD_ERROR, FIX_ERRORS } from "../../configs/constants";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  rePassword: "",
  name: "",
};

const Register = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showErrors, setShowErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // fetchAllRoles();
  }, []);

  const handleSubmit = async () => {
    try {
      const initialErrors = {
        ...initialState,
      };
      Object.keys(initialErrors).forEach((key) => (initialErrors[key] = true));
      setShowErrors(initialErrors);
      checkForErrors(userDataObj);
      if (Object.values(errors).filter(Boolean).length) {
        message.warning(FIX_ERRORS);
        checkForErrors(userDataObj);
        return;
      }
      const result = await HttpServices.postRequest(
        REGISTER_ENDPOINT,
        userDataObj
      );
      const token = get(result, ["data", "accessToken"]);
      localStorage.setItem("authToken", token);
      navigate(`/home/room-list/Lingala`);
      console.log("F-4", result);
    } catch (e) {
      console.error(e);
      message.error(get(e, ["response", "data", "error"]));
    }
  };

  const handleInputChange = (key, value) => {
    const userDataObjCopy = {
      ...userDataObj,
    };
    const showErrorObj = {
      ...showErrors,
    };

    userDataObjCopy[key] = value;
    showErrorObj[key] = true;
    setShowErrors(showErrorObj);
    setUserDataObj(userDataObjCopy);
    checkForErrors(userDataObjCopy);
  };

  const checkForErrors = (userDataObj) => {
    const userName = userNamePolicy(userDataObj.userName);
    const password = passwordPolicy(userDataObj.password);
    const rePassword = rePasswordPolicy(
      userDataObj.password,
      userDataObj.rePassword
    );
    const email = emailPolicy(userDataObj.email);
    const name = !userDataObj.name ? EMPTY_FIELD_ERROR : null;
    setErrors({
      userName,
      password,
      rePassword,
      email,
      name,
    });
  };

  // const fetchAllRoles = async () => {
  //   try {
  //     const result = await HttpServices.getRequest(FETCH_ALL_ROLES_ENDPOINT);
  //     const roles = result.data.map((roleObj) => roleObj.role);
  //     setAvailableRoles(roles);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className="login-form-container">
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <InputWithLabel
          label="Email"
          value={userDataObj.email}
          onInputChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email"
          helperText={errors.email}
          showError={showErrors.email}
        />
        <InputWithLabel
          label="Name"
          value={userDataObj.name}
          onInputChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter Name"
          helperText={errors.name}
          showError={showErrors.name}
        />
        <InputWithLabel
          label="User Name"
          value={userDataObj.userName}
          onInputChange={(e) => handleInputChange("userName", e.target.value)}
          placeholder="Enter User Name"
          helperText={errors.userName}
          showError={showErrors.userName}
        />
        <InputWithLabel
          type="password"
          label="Password"
          value={userDataObj.password}
          onInputChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.password}
          showError={showErrors.password}
        />
        <InputWithLabel
          type="password"
          label="Re Type Password"
          value={userDataObj.rePassword}
          onInputChange={(e) => handleInputChange("rePassword", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.rePassword}
          showError={showErrors.rePassword}
        />
        {/* <div className="bottom-padding">
          <CheckboxGroup
            options={availableRoles}
            value={userDataObj.roles}
            onChange={(value) => handleInputChange("roles", value)}
          />
          {showErrors.roles && <div className="error">{errors.roles}</div>}
        </div> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
