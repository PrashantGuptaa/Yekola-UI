import "./peer.css";
import { Avatar, Button } from "antd";
import {
  getNameIntials,
  getRandomAvatarColor,
} from "../../../utils/helperFuncs";
import { getLocalUserName } from "./../../../utils/helperFuncs";
import { advanceRoles } from "../../../configs/constants";
import { useVideo, useAVToggle } from "@100mslive/react-sdk";

function Peer({ peer }) {
  const { isLocalVideoEnabled } = useAVToggle();

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      className={
        `${advanceRoles.includes(peer?.roleName)
          ? "teacher-peer peer-container"
          : "peer-container"} ${isLocalVideoEnabled ? 'no-padding' : null}`
      }
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
          <div className={`peer-avatar-container ${advanceRoles.includes(peer?.roleName)
            ? "teacher-avatar-container"
            : null}`   }>
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
      <div    className={
        advanceRoles.includes(peer?.roleName)
          ? "teacher-peer-name"
          : "peer-name"
      }>{getLocalUserName(peer)}</div>
    </div>
  );
}

export default Peer;
