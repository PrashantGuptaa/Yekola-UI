import {
  useAVToggle,
  useHMSStore,
  selectIsLocalScreenShared,
  useHMSActions
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

function HmsFooter() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const hmsActions = useHMSActions();

  console.log("F-2 Local items",amIScreenSharing, isLocalAudioEnabled, isLocalVideoEnabled);

  const handleScreenShare = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);

    } catch (e) {
      console.error(e);
    }
  }
  const contClassName = "icon-container complete-center";
  return (
    <div className="control-bar">
      <span className={contClassName} onClick={toggleAudio}>
        {isLocalAudioEnabled ? (
          <AudioMutedOutlined className="st-icon" />
        ) : (
          <AudioOutlined className="st-icon" />
        )}
      </span>
      <span className={contClassName} onClick={toggleVideo}>
        {isLocalVideoEnabled ? (
          // <EyeInvisibleOutlined className='st-icon'/>
          <img src={CameraOff} alt="camera-off" className="img-icon" />
        ) : (
          <VideoCameraOutlined className="st-icon" />
        )}
      </span>
      <span className={contClassName} onClick={handleScreenShare}>
        {amIScreenSharing ? (
          // <EyeInvisibleOutlined className='st-icon'/>
          <img src={CameraOff} alt="camera-off" className="img-icon" />
        ) : (
          <FundProjectionScreenOutlined className="st-icon" />
        )}
      </span>
      {/* <span></span> */}
    </div>
  );
}

export default HmsFooter;
