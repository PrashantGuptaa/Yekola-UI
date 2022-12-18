import { Form, Button, message, Checkbox } from "antd";
import InputWithLabel from "../../components/InputWithLabel";
import { useState, useEffect } from "react";
import HttpServices from "../../configs/https.service";
import { FETCH_ALL_ROLES_ENDPOINT } from "./../../configs/apiEndpoints";
import "./register.css";
import {
  userNamePolicy,
  passwordPolicy,
  rePasswordPolicy,
  rolesPolicy,
  emailPolicy,
} from "../../utils/userSignPolicies";

const initialState = {
  userName: "",
  email: "",
  password: "",
  rePassword: "",
  name: "",
};
const CheckboxGroup = Checkbox.Group;

const Register = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [availableRoles, setAvailableRoles] = useState(["Guest"]);
  const [showErrors, setShowErrors] = useState({});

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleSubmit = () => {
    const initialErrors = {
      ...initialState,
    };
    Object.keys(initialErrors).forEach((key) => (initialErrors[key] = true));
    setShowErrors(initialErrors);
    checkForErrors(userDataObj);
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
    const roles = rolesPolicy(userDataObj.roles);
    setErrors({
      userName,
      password,
      rePassword,
      roles,
      email
    });
  };

  const fetchAllRoles = async () => {
    try {
      const result = await HttpServices.getRequest(FETCH_ALL_ROLES_ENDPOINT);
      const roles = result.data.map((roleObj) => roleObj.role);
      setAvailableRoles(roles);
    } catch (e) {
      console.error(e);
    }
  };

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
