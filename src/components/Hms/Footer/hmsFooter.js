import {
  useAVToggle,
  useHMSStore,
  selectIsLocalScreenShared,
  useHMSActions,
  selectPermissions,
  selectIsAllowedToPublish,
} from "@100mslive/react-sdk";
import {
  CameraOutlined,
  AudioMutedOutlined,
  AudioOutlined,
  FundProjectionScreenOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./footer.css";
import CameraOff from "../../../assets/images/no-video.png";
import {
  TbScreenShare,
  TbScreenShareOff,
  TbMicrophone,
  TbMicrophoneOff,
} from "react-icons/tb";

function HmsFooter({}) {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const publishPermissions = useHMSStore(selectIsAllowedToPublish);

  const { screen: isScreenShareAllowed, audio: isEnablingAudioAllowed } =
    publishPermissions;
  const hmsActions = useHMSActions();

  console.log(
    "F-2 Local items",
    amIScreenSharing,
    isLocalAudioEnabled,
    publishPermissions
  );

  const handleScreenShare = async () => {
    try {
      await hmsActions.setScreenShareEnabled(!amIScreenSharing);
      // await hmsActions.setsc
    } catch (e) {
      console.error(e);
    }
  };
  const contClassName = "icon-container  complete-center";

  return (
    <div className="control-bar">
      <span className={contClassName} onClick={toggleAudio}>
        {isLocalAudioEnabled ? (
          <>
            <TbMicrophone className="st-icon" />
            <span>Mute</span>
          </>
        ) : (
          <>

            <TbMicrophoneOff className="st-icon" />
            <span>Unmute</span>
          </>
        )}
      </span>
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
      {/* <span></span> */}
    </div>
  );
}

export default HmsFooter;
