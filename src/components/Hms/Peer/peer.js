import "./peer.css";
import { Avatar, Button } from "antd";
import { getRandomAvatarColor } from "../../../utils/helperFuncs";

function Peer({ peer }) {
  const getNameIntials = () => {
    try {
      const nameArr = peer?.name?.split(" ");
      return `${nameArr[0][0]}${nameArr[nameArr.length - 1][0]}`;
    } catch (e) {
      console.error("Error in name Intial", e);
      return "U";
    }
  };
  console.log("F-4", peer);
  return (
    <div className="peer-container">
      <div className="peer-video-container">
        <div className="peer-avatar-container">
          <Avatar
            className="room-block-image"
            style={{
              backgroundColor: getRandomAvatarColor(),
            }}
            size="large"
          >
            {getNameIntials()}
          </Avatar>
        </div>
      </div>
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
