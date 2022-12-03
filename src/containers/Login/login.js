import React, { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import "./login.css";
import InputWithLabel from "./../../components/InputWithLabel/index";
import { passwordPolicy, userNamePolicy } from "../../utils/utils";
import HttpServices from "../../configs/https.service";
import { LOGIN_ENPOINT } from "../../configs/apiEndpoints";
import { get } from "lodash";
import { FIX_ERRORS } from './../../configs/constants';

const intialState = {
    userName: null,
    password: null
}
const Login = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(intialState);
  const [errors, setErrors] = useState(intialState);

  useEffect(() => {
checkForErrors();
  }, [userDataObj]);

  const checkForErrors = () => {
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
    obj[key] = value;
    setUserDataObj(obj);
  };

  const handleSubmit = async () => {
    if (Object.values(errors).length) {
        message.warning(FIX_ERRORS);
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
        />
        <InputWithLabel
          label="Password"
          value={userDataObj.password}
          onInputChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter Password"
          helperText={errors.password}
        />
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
