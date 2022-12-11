import { useVideo } from "@100mslive/react-sdk";
import './peer.css';

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });
  console.log("F-4")
  return (
    <div className="peer-container">
      <div className="peer-video-container">

      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      </div>
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
