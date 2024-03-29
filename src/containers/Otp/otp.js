import { message, Spin } from "antd";
import "./otp.css";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import HttpServices from "../../configs/https.service";
import { VERIFY_OTP_ENDPOINT } from "../../configs/apiEndpoints";
import { useParams } from "react-router-dom";
import SuccessOtp from "./successOtp";
import ExpiredOtp from "./expiredOtp";
import { get } from 'lodash';
import { setLocalStorageWithUserDetails } from "../../utils/helperFuncs";

const Otp = () => {
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(true);

  const { token, otp } = useParams();
  // localStorage.setItem("authToken", token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    validateOtp();
  }, []);

  const validateOtp = async () => {
    try {
      const result = await HttpServices.postRequest(VERIFY_OTP_ENDPOINT, {
        otp,
        token // temp token, only valid for 5 mins. Don't set in local storage
      });
      setLocalStorageWithUserDetails(get(result, ['data', 'data']));
      // const message = get(result, ['data', 'message']);
      message.success(get(result, ['data', 'message']));
      setSuccess(true);
    } catch (e) {
      console.error(e);
      message.error(get(e, ['response', 'data', 'message']));
      setSuccess(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <>{success ? <SuccessOtp /> : <ExpiredOtp />}</>
      )}
    </>
  );

  // );
};
export default Otp;
