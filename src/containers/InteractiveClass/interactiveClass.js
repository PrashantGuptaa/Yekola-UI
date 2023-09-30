import { message, Spin } from "antd";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HttpServices from "../../configs/https.service";
import { JOIN_HMS_ROOM_ENDPOINT } from "../../configs/apiEndpoints";
import Conference from "./../../components/Hms/Conference";
import HmsFooter from "./../../components/Hms/Footer";
import "./interactiveClass.css";
import ParticipantList from "../../components/ParticipantList";
import { get } from "lodash";

const InteractiveClass = () => {
  const [showParticipantList, setShowParticipantList] = useState(false);
  const users = useHMSStore(selectPeers);
  const isFirstRender = useRef(true);
  const routeParams = useParams();
  const { roomId, product } = routeParams;

  // HMS
  const hmsActions = useHMSActions();
  const navigate = useNavigate();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    if (isFirstRender.current) {
      joinHmsRoom();
      isFirstRender.current = false;
    }
  }, []);

  const joinHmsRoom = async () => {
    try {

      document.getElementsByTagName('body')[0].style.backgroundColor = '#242424';
      const response = await HttpServices.getRequest(
        JOIN_HMS_ROOM_ENDPOINT(roomId)
        );
        const authToken = get(response, ['data', 'data', 'roomToken']);
        // const { name: userName, authToken } = data;
        await hmsActions.join({
          userName: localStorage.getItem('name') || "Yekola User",
          authToken,
        });
      } catch (e) {
        console.error(e);
        message.error(get(e, ['response', 'data', 'message']));
      }
  };

  const handleLeaveRoom = async () => {
    await hmsActions.leave();
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
    navigate(`/home/room-list/Yekola`);
  };

  const getLoader = () => (
    <div className="complete-center">
      <Spin tip="Loading..." size="large" />
    </div>
  );

  const getClassRoomView = () => {
    return (
      <>
        <Conference handleLeaveRoom={handleLeaveRoom} />
        <HmsFooter
          showParticipantList={showParticipantList}
          handleShowParticipantList={() => setShowParticipantList(true)}
        />
        <ParticipantList
          users={users}
          showParticipantList={showParticipantList}
          handleCloseParticipantList={() => setShowParticipantList(false)}
        />
      </>
    );
  };
  return (
    <div className="interactive-class-container">
      {!isConnected ? (
        getLoader()
      ) : (
        <div className="classroom-container">{getClassRoomView()}</div>
      )}
    </div>
  );
};

export default InteractiveClass;
