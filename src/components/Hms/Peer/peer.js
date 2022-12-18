import "./peer.css";
import { Avatar, Button } from "antd";
import { getNameIntials, getRandomAvatarColor } from "../../../utils/helperFuncs";
import { getLocalUserName } from './../../../utils/helperFuncs';

function Peer({ peer }) {

  console.log("F-4", peer);
  return (
    <div className="peer-container">
      <div className="peer-video-container">
        <div className="peer-avatar-container">
          <Avatar
            className="room-block-image"
            style={{
              backgroundColor: getRandomAvatarColor(peer.id),
            }}
            size="large"
          >
            {getNameIntials(peer.name)}
          </Avatar>
        </div>
      </div>
      <div className="peer-name">
        {getLocalUserName(peer)}
      </div>
    </div>
  );
}

export default Peer;
