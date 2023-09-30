import landingImg2 from "../../assets/images/ldk2.avif";
import { Button, Typography } from "antd";
import { HiChevronRight } from "react-icons/hi";
import RoomList from "../RoomList";
import { useRef } from 'react';
import "./landing.css";

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
          Welcome/Bienvenue Bana Mboka!
          </Text>
          <Text className="sub-heading" type="secondary">
          This is a judgement free learning space.
            </Text>
          <Text className="motivation-heading">
          {`Our mission is to teach, learn & connect you all to preserve our languages.`}
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
