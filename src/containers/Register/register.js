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
} from "../../utils/userSignPolicies";

const initialState = {
  userName: null,
  email: null,
  password: null,
  rePassword: null,
  roles: [],
  activeRole: null,
  name: null,
};
const CheckboxGroup = Checkbox.Group;

const Register = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [availableRoles, setAvailableRoles] = useState(["Guest"]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleSubmit = () => {};

  const handleInputChange = (key, value) => {
    const obj = {
      ...userDataObj,
    };
    obj[key] = value;
    setUserDataObj(obj);
    checkForErrors(obj);
  };

  const checkForErrors = (userDataObj) => {
    const userName = userNamePolicy(userDataObj.userName);
    const password = passwordPolicy(userDataObj.password);
    const rePassword = rePasswordPolicy(
      userDataObj.password,
      userDataObj.rePassword
    );
    const roles = rolesPolicy(userDataObj.roles);
    setErrors({
      userName,
      password,
      rePassword,
      roles,
    });
  };

  const fetchAllRoles = async () => {
    try {
      const result = await HttpServices.getRequest(FETCH_ALL_ROLES_ENDPOINT);
      console.log(result, "F-7");
      const roles = result.data.map((roleObj) => roleObj.role);
      setAvailableRoles(roles);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRolesChange = (selectedRoles) => {
    console.log("F-11", selectedRoles);
    setSelectedRoles(selectedRoles);
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
        />
        <InputWithLabel
          label="User Name"
          value={userDataObj.userName}
          onInputChange={(e) => handleInputChange("userName", e.target.value)}
          placeholder="Enter User Name"
          helperText={errors.userName}
        />
        <InputWithLabel
          type="password"
          label="Password"
          value={userDataObj.password}
          onInputChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.password}
        />
        <InputWithLabel
          type="password"
          label="Re Type Password"
          value={userDataObj.rePassword}
          onInputChange={(e) => handleInputChange("rePassword", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.rePassword}
        />
        <div className="bottom-padding">
          <CheckboxGroup
            options={availableRoles}
            value={userDataObj.roles}
            onChange={(value) => handleInputChange("roles", value)}
          />
          <div className="error">{errors.roles}</div>
        </div>

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
