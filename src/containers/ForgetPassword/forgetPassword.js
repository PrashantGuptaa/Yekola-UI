import { useEffect, useState } from "react";
import { Button, Card, Form, message, Steps, Alert } from "antd";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../../components/InputWithLabel";
import {
  passwordPolicy,
  rePasswordPolicy,
} from "./../../utils/userSignPolicies";
import { EMPTY_FIELD_ERROR, FIX_ERRORS } from "../../configs/constants";
import HttpServices from "../../configs/https.service";
import {
  RESET_PASSWORD_ENDPOINT,
  UPDATE_PASSWORD_ENDPOINT,
} from "./../../configs/apiEndpoints";
import tick from "../../assets/images/tick.png";
import { clearLocalStorageWithUserDetails } from "../../utils/helperFuncs";
import "./forgetpassword.css";

const initialState = {
  securityCode: "",
  password: "",
  retypePassword: "",
};

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [forgetPasswordObj, setForgetPasswordObj] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [showErrors, setShowErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorageWithUserDetails()
  }, [])

  const checkForErrors = (forgetPasswordObj) => {
    const errors = {};
    errors.password = passwordPolicy(forgetPasswordObj.password);
    errors.retypePassword = rePasswordPolicy(
      forgetPasswordObj.password,
      forgetPasswordObj.retypePassword
    );
    if (!forgetPasswordObj.retypePassword)
      errors.retypePassword = EMPTY_FIELD_ERROR;
    if (!forgetPasswordObj.securityCode)
      errors.securityCode = EMPTY_FIELD_ERROR;

    setErrors(errors);
  };

  const handleSubmit = async () => {
    const initialErrors = {
      ...initialState,
    };
    Object.keys(initialErrors).forEach((key) => (initialErrors[key] = true));
    setShowErrors(initialErrors);
    if (Object.values(errors).filter(Boolean).length) {
      message.warning(FIX_ERRORS);
      checkForErrors(forgetPasswordObj);
      return;
    }
    try {
      setLoading(true);
      await HttpServices.patchRequest(UPDATE_PASSWORD_ENDPOINT, {
        email,
        ...forgetPasswordObj,
      });
      setCurrentStep(currentStep + 1);
    } catch (e) {
      console.error(e);
      message.error(get(e, ["response", "data", "message"]));
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      const initialErrors = {
        ...initialState,
      };

      if (!email) {
        message.warning(FIX_ERRORS);
        initialErrors.email = true;
        setShowErrors(initialErrors);
        return;
      }
      setLoading(true);
      const result = await HttpServices.patchRequest(RESET_PASSWORD_ENDPOINT, {
        email,
      });
      console.log("REsult", result);
      setAlertMessage(`Email has been sent to you with a security code`);
      setCurrentStep(currentStep + 1);
    } catch (e) {
      console.error(e);
      message.error(get(e, ["response", "data", "message"]));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    const obj = {
      ...forgetPasswordObj,
    };
    const showErrorObj = {
      ...showErrors,
    };
    obj[key] = value;
    showErrorObj[key] = true;
    setShowErrors(showErrorObj);
    setForgetPasswordObj(obj);
    checkForErrors(obj);
  };

  const steps = [
    {
      title: "Email",
      content: (
        <Card
          title=""
          bordered={true}
          style={{
            width: 320,
          }}
        >
          <Form onFinish={handleNext} layout="vertical" form={form}>
            <InputWithLabel
              label="Email"
              value={email}
              onInputChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              helperText={errors.email}
              showError={showErrors.email}
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onSubmit={handleNext}
                disabled={!email}
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      title: "Verification",
      content: (
        <Card
          title="Forget Password"
          bordered={true}
          style={{
            width: 320,
          }}
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <InputWithLabel
              label="Security Code"
              value={forgetPasswordObj.securityCode}
              onInputChange={(e) =>
                handleInputChange("securityCode", e.target.value)
              }
              placeholder="Enter Security Code"
              helperText={errors.securityCode}
              showError={showErrors.securityCode}
            />
            <InputWithLabel
              type="password"
              label="Password"
              value={forgetPasswordObj.password}
              onInputChange={(e) =>
                handleInputChange("password", e.target.value)
              }
              placeholder="Enter Password"
              helperText={errors.password}
              showError={showErrors.password}
            />

            <InputWithLabel
              type="password"
              label="Re type Password"
              value={forgetPasswordObj.retypePassword}
              onInputChange={(e) =>
                handleInputChange("retypePassword", e.target.value)
              }
              placeholder="Re-Enter Password"
              helperText={errors.retypePassword}
              showError={showErrors.retypePassword}
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onSubmit={handleSubmit}
                disabled={
                  Object.values(forgetPasswordObj).filter(Boolean).length !== 3
                }
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      title: "Success",
      content: (
        <Card
          title="Password updated successfully"
          bordered={true}
          style={
            {
              width: 320,
            }
          }
          cover={<img alt="success" src={tick} className="tick" />}
        >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={() => navigate("/sign-user")}
              >
                Naivgate to Login
              </Button>
     
        </Card>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="forget-password-container">
      <section className="step-container">
        <Steps items={items} current={currentStep} />
        {alertMessage && (
          <Alert message={alertMessage} type="success" showIcon />
        )}

        {steps[currentStep].content}
      </section>
    </div>
  );
};

export default ForgetPassword;
