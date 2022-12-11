import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./../Peer/";
import "./conference.css";
import { useParams } from "react-router-dom";
import { Button } from "antd";

function Conference({ handleLeaveRoom }) {
  const peers = useHMSStore(selectPeers);
  const { product, className } = useParams();


  return (
    <div className="conference-section">
      <div className="meta-room-section">
        <div className="room-name complete-center">{className}</div>
        <Button type="primary" danger onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </div>

      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;
