import React, { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import "./login.css";
import InputWithLabel from "./../../components/InputWithLabel";
import { passwordPolicy, userNamePolicy } from "../../utils/userSignPolicies";
import HttpServices from "../../configs/https.service";
import { LOGIN_ENPOINT } from "../../configs/apiEndpoints";
import { get } from "lodash";
import { FIX_ERRORS } from './../../configs/constants';

const initialState = {
    userName: null,
    password: null
}
const Login = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showErrors, setShowErrors] = useState({});

  const checkForErrors = (userDataObj) => {
    const password = passwordPolicy(userDataObj.password);
    const userName = userNamePolicy(userDataObj.userName);
    setErrors({
        userName,
        password
    })
  }

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
    if (Object.values(errors).length) {
        message.warning(FIX_ERRORS);
        checkForErrors(userDataObj);
        return;
    }
    try {
        const result = await HttpServices.postRequest(LOGIN_ENPOINT, userDataObj);
        message.success("Login Successfully");
    } catch (e) {
        console.error(e);
        message.error(get(e, ['response', 'data', 'error']));

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
          label="User Name"
          value={userDataObj.userName}
          onInputChange={(e) => handleInputChange("userName", e.target.value)}
          placeholder="Enter User Name"
          helperText={errors.userName}
          showError={showErrors.userName}

        />
        <InputWithLabel
        type='password'
          label="Password"
          value={userDataObj.password}
          onInputChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.password}
          showError={showErrors.password}
        />
        <Form.Item>
          <Button type="primary"
          htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
