import "./peer.css";
import { Avatar, Typography } from "antd";
import {
  getNameIntials,
  getRandomAvatarColor,
} from "../../../utils/helperFuncs";
import { getLocalUserName } from "./../../../utils/helperFuncs";
import { advanceRoles } from "../../../configs/constants";
import { useVideo, useAVToggle } from "@100mslive/react-sdk";

const { Title } = Typography;

function Peer({ peer }) {

  const { isLocalVideoEnabled } = useAVToggle();

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      className={`${
        advanceRoles.includes(peer?.roleName)
          ? "teacher-peer peer-container"
          : "peer-container"
      } ${isLocalVideoEnabled ? "no-padding" : null}`}
    >
      <div className="peer-video-container">
        {isLocalVideoEnabled ? (
          <video
            ref={videoRef}
            className={`peer-video ${peer.isLocal ? "local" : ""}`}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <div className={`peer-avatar-container`}>
            <Avatar
              style={{
                backgroundColor: getRandomAvatarColor(peer.id),
                transform: "scale(2)",
              }}
              size="large"
            >
              {getNameIntials(peer.name)}
            </Avatar>
          </div>
        )}
      </div>
      <Title
        level={advanceRoles.includes(peer?.roleName) ? 4 : 5}
        className="peer-name"
      >
        {getLocalUserName(peer)}
      </Title>
    </div>
  );
}

export default Peer;
