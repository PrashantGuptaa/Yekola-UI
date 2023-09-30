import React, { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import "./login.css";
import InputWithLabel from "./../../components/InputWithLabel";
import { passwordPolicy, userNamePolicy } from "../../utils/userSignPolicies";
import HttpServices from "../../configs/https.service";
import { LOGIN_ENPOINT } from "../../configs/apiEndpoints";
import { capitalize, get } from "lodash";
import { FIX_ERRORS } from "./../../configs/constants";
import { useNavigate } from 'react-router-dom';
import Captcha from "../../components/Captcha";

const initialState = {
  email: null,
  password: null,
};
const Login = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showErrors, setShowErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkForErrors = (userDataObj) => {
    const password = passwordPolicy(userDataObj.password);
    const email = userNamePolicy(userDataObj.email);
    setErrors({
      email,
      password,
    });
  };

  const handleInputChange = (key, value) => {
    const obj = {
      ...userDataObj,
    };
    const showErrorObj = {
      ...showErrors,
    };
    obj[key] = value;
    showErrorObj[key] = true;
    setShowErrors(showErrorObj);
    setUserDataObj(obj);
    checkForErrors(obj);
  };

  const handleSubmit = async () => {
    const initialErrors = {
      ...initialState,
    };
    Object.keys(initialErrors).forEach((key) => (initialErrors[key] = true));
    setShowErrors(initialErrors);
    if (Object.values(errors).filter(Boolean).length) {
      message.warning(FIX_ERRORS);
      checkForErrors(userDataObj);
      return;
    }
    try {
      setLoading(true);
      const result = await HttpServices.postRequest(LOGIN_ENPOINT, userDataObj);
      console.log("F-4", result)
      const token = get(result, ['data', 'data', 'token']);
      const active = get(result, ['data',  'data', 'active']);
      const email = get(result, ['data',  'data', 'email']);
      const name = get(result, ['data',  'data', 'name']);
      const role = get(result, ['data',  'data', 'role']);

      localStorage.setItem('authToken', token);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      if (!active) {
        navigate('/account');
        return;
      }
      message.success(`Welcome to Yekola ${name}`);
      navigate(`/home/room-list/Yekola`)
    } catch (e) {
      console.log(JSON.stringify(e));
      console.log(e.response);
      console.error(e);
      message.error(get(e, ["response", "data", "message"]));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <Form
        onFinish={handleSubmit}
        //   {...formItemLayout}
        layout="vertical"
        form={form}
      >
        <InputWithLabel
          label="Email"
          value={userDataObj.email}
          onInputChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email"
          helperText={errors.email}
          showError={showErrors.email}
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
        <Captcha />
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
