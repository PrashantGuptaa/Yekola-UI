import { Form, Button, message, Radio } from "antd";
import InputWithLabel from "../../components/InputWithLabel";
import { useState } from "react";
import HttpServices from "../../configs/https.service";
import { REGISTER_ENDPOINT } from "./../../configs/apiEndpoints";
import "./register.css";
import {
  userNamePolicy,
  passwordPolicy,
  rePasswordPolicy,
  emailPolicy,
} from "../../utils/userSignPolicies";
import {
  EMPTY_FIELD_ERROR,
  FIX_ERRORS,
  LISTENER_ROLE,
  TEACHER_ROLE,
} from "../../configs/constants";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { setLocalStorageWithUserDetails } from "../../utils/helperFuncs";

const initialState = {
  userName: "",
  email: "",
  password: "",
  rePassword: "",
  name: "",
  role: LISTENER_ROLE,
};

const Register = () => {
  const [form] = Form.useForm();
  const [userDataObj, setUserDataObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showErrors, setShowErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      setLoading(true);
      const result = await HttpServices.postRequest(
        REGISTER_ENDPOINT,
        userDataObj
      );
      setLocalStorageWithUserDetails(get(result, ["data", "data"]));
      navigate(`/account`);
    } catch (e) {
      console.error(e);
      message.error(get(e, ["response", "data", "message"]));
    } finally {
      setLoading(false);
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
        <div className="bottom-padding">
          <Radio.Group
            onChange={(e) => handleInputChange("role", e.target.value)}
            value={userDataObj.role}
          >
            <Radio value={LISTENER_ROLE}>Learner</Radio>
            <Radio value={TEACHER_ROLE}>Teacher</Radio>
          </Radio.Group>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
