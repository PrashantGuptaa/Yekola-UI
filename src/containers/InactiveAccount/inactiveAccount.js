import { Button, Typography } from "antd";
import ResendOtp from "../../components/resendOtp/resendOtp";
import './account.css';

const { Title } = Typography;

const InActiveAccount = () => {
  return (
    <div className="account-container">
      <img
        src="https://imgs.search.brave.com/vgjFG3iLzhthgWnEU-j_pz4ozkK5RVONH13if35gJNI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC81NC82NC9o/YW5kLWRyYXduLWNh/cnRvb24tb2YtbWFu/LXJ1bm5pbmctbGF0/ZS13aXRoLWNsb2Nr/LXZlY3Rvci0yMTYx/NTQ2NC5qcGc"
        alt="account-inactive"
      />
      <Title level={5}>
        We've sent an email to your registered account. Please click on the link to verify the account. Link is valid for 5 minutes only.
      </Title>
      <ResendOtp />
    </div>
  );
};

export default InActiveAccount;
