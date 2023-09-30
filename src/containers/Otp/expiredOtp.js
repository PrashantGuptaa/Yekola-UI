import clock from "../../assets/images/clock.jpg";
import "./otp.css";
import { Typography } from "antd";
import ResendOtp from "../../components/resendOtp/resendOtp";

const { Title } = Typography;

const ExpiredOtp = () => {


  return (
    <div className="otp-container">
      <img
        src={clock}
        alt="expired"
      />
      <Title level={4}>
        This link is expired.
      </Title>
      <ResendOtp />
    </div>
  );
};
export default ExpiredOtp;
