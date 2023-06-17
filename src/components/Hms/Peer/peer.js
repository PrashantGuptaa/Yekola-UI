import "./peer.css";
import { Avatar, Button } from "antd";
import { getNameIntials, getRandomAvatarColor } from "../../../utils/helperFuncs";
import { getLocalUserName } from './../../../utils/helperFuncs';
import {
  // Avatar,
  StyledVideoTile,
  useBorderAudioLevel,
  Video,
  VideoTileStats,
} from "@100mslive/react-ui";
import { advanceRoles } from "../../../configs/constants";
function Peer({ peer }) {

  console.log("F-4", peer);
  return (
    <div className={advanceRoles.includes(peer?.roleName) ? "teacher-peer peer-container" : "peer-container"}>
      <div className="peer-video-container">
        <div className="peer-avatar-container">
          <Avatar
            style={{
              backgroundColor: getRandomAvatarColor(peer.id),
              transform: 'scale(2)'
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
