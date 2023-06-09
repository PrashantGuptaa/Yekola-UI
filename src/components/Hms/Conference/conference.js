import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./../Peer/";
import "./conference.css";
import { useParams } from "react-router-dom";
import { Button, notification } from "antd";

function Conference({ handleLeaveRoom }) {
  const peers = useHMSStore(selectPeers);
  const { product, className } = useParams();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (peerName) => {
    console.log("Open notigicatiob", peerName)
    api.open({
      message: `${peerName} raised hand`,
      placement: "bottomLeft",
      duration: 1
    });
  };

  const getNotificationDetail = (peer) => {
    const metaData = JSON.parse(peer.metadata || "{}");
    if (metaData?.isHandRaised) openNotification(peer.name);
  };

  return (
    <div className="conference-section">
      <div className="meta-room-section">
        <div className="room-name complete-center">{className}</div>
        <Button type="primary" danger onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </div>

      <div className="peers-container">
        {peers.map((peer) => {
          return (
            <>
              <Peer key={peer.id} peer={peer} />
              {getNotificationDetail(peer)}
              {contextHolder}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Conference;
