import {
  useAVToggle,
  useHMSStore,
  selectIsLocalScreenShared,
  useHMSActions,
  selectIsAllowedToPublish,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import {
  TbScreenShare,
  TbScreenShareOff,
  TbMicrophone,
  TbMicrophoneOff,
} from "react-icons/tb";
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { FaUsersSlash, FaUsers } from "react-icons/fa";
import { IoIosHand } from "react-icons/io";
import "./footer.css";

function HmsFooter({ showParticipantList, handleShowParticipantList }) {
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const publishPermissions = useHMSStore(selectIsAllowedToPublish);
  const localPeer = useHMSStore(selectLocalPeer);
  const { isHandRaised = false } = JSON.parse(localPeer?.metadata || "{}");

  const {
    screen: isScreenShareAllowed,
    audio: isEnablingAudioAllowed,
    video: isEnablingVideoAllowed,
  } = publishPermissions;
  const hmsActions = useHMSActions();

  const handleScreenShare = async () => {
    try {
      await hmsActions.setScreenShareEnabled(!amIScreenSharing);
      // await hmsActions.setsc
    } catch (e) {
      console.error(e);
    }
  };

  const handleRaiseHand = async () => {
    const metaData = JSON.parse(localPeer?.metadata || "{}");
    metaData.isHandRaised = !metaData.isHandRaised;
    hmsActions.changeMetadata(JSON.stringify(metaData));
  };
  
  const contClassName = `icon-container  complete-center`;

  return (
    <div className="control-bar">
      <span
        className={`${contClassName} ${
          isEnablingAudioAllowed ? null : "disabled1"
        }`}
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? (
          <>
            <TbMicrophone className="st-icon" />
            <span>Mute</span>
          </>
        ) : (
          <>
            <TbMicrophoneOff className="st-icon"  />
            <span>Unmute</span>
          </>
        )}

  
      </span>
      {isEnablingVideoAllowed ? (
          <span className={contClassName} onClick={toggleVideo}>
            {isLocalVideoEnabled ? (
              <>
                <BsCameraVideoOff className="st-icon" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <BsCameraVideo className="st-icon" />
                <span>Video</span>
              </>
            )}
          </span>
        ) : null}
      {isScreenShareAllowed ? (
        <span className={contClassName} onClick={handleScreenShare}>
          {amIScreenSharing ? (
            <>
              <TbScreenShareOff className="st-icon" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <TbScreenShare className="st-icon" />
              <span>Share</span>
            </>
          )}
        </span>
      ) : null}

      <span className={contClassName} onClick={handleShowParticipantList}>
        {showParticipantList ? (
          <FaUsersSlash className="st-icon" />
        ) : (
          <FaUsers className="st-icon" />
        )}
        <span>Particpants</span>
      </span>
      <span className={contClassName} onClick={handleRaiseHand}>
        {isHandRaised ? (
          <>
            <IoIosHand className="st-icon raise" />
            <span>Down</span>
          </>
        ) : (
          <>
            <IoIosHand className="st-icon" />
            <span>Raise</span>
          </>
        )}
      </span>
    </div>
  );
}

export default HmsFooter;
