import landingImg from "../../assets/images/reading.jpg";
import "./landing.css";
// import landingImg2 from '../../assets/images/reading2.jpg';
import landingImg2 from "../../assets/images/study.png";
import { Button, Typography } from "antd";
import { HiChevronRight } from "react-icons/hi";
import RoomList from "../RoomList";
import { useRef } from 'react';
const { Text } = Typography;

const LandingPage = () => {
  const roomsRef = useRef();

  const handleStart = () => {
    roomsRef.current.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({top: roomsRef.current.offsetTop, behavior: 'smooth'})

  }
  return (
    <div className="landing-page-container">
      <div className="first-section">
        <div className="text-content-container">
          <Text level={3} className="main-heading">
            Believe in yourself. You are braver than you think, more talented
            than you know, and capable of more than you imagine
          </Text>
          <Text className="sub-heading" type="secondary">
            Connect back to your roots Connect back to your roots
          </Text>
          <Text className="motivation-heading">
            Some other motivational text
          </Text>
          <div>
            <Button type="primary" onClick={handleStart}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Let's get started <HiChevronRight />
              </div>
            </Button>
          </div>
        </div>
        <div className="landing-img-container">
          <img src={landingImg2} alt="landing-img" className="img-landing"  />
        </div>
      </div>
      <div ref={roomsRef}>

      <RoomList  />
      </div>
    </div>
  );
};

export default LandingPage;
