import { Button } from "antd";
import { Typography } from "antd";
import "./otp.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SuccessOtp = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(`/home/room-list/Yekola`);

  return (
    <div className="otp-container">
      <img
        src="https://imgs.search.brave.com/jscrsqyjeMJC4x5BKn17Fk_YiN3Fi0srJNAH15qbuxA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NzEwMTI1Ni92ZWN0/b3IvaGFwcHktcGVv/cGxlLWp1bXBpbmct/Y2VsZWJyYXRpbmct/dmljdG9yeS1mbGF0/LWNhcnRvb24tY2hh/cmFjdGVycy1pbGx1/c3RyYXRpb24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPW1q/YWpoa2syWWxxNjlV/YUpNSUtaUmxGMjdx/SHVXSk1jWlBiOUx4/bVV4cXM9"
        alt="celebration"
      />
      <Title level={4}>
        Welcome to Yekola. Your account have been verified
      </Title>
      <Button onClick={navigateToHome} type="primary">Home</Button>
    </div>
  );
};
export default SuccessOtp;
