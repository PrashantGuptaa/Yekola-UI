import { Spin } from "antd";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  selectPeers, 
  selectLocalPeer
} from "@100mslive/react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import HttpServices from "../../configs/https.service";
import { JOIN_HMS_ROOM_ENDPOINT } from "../../configs/apiEndpoints";
import Conference from './../../components/Hms/Conference';
import HmsFooter from './../../components/Hms/Footer';
import './interactiveClass.css';
import ParticipantList from "../../components/ParticipantList";

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
    const { data } = await HttpServices.getRequest(
      JOIN_HMS_ROOM_ENDPOINT(roomId)
    );
    const { name: userName, authToken } = data;
    await hmsActions.join({
      userName,
      authToken,
    });
  };

  const handleLeaveRoom = async () => {
    await hmsActions.leave();
    navigate(`/room-list/${product}`)
  }

  const getLoader = () => (
    <div className="complete-center">
      <Spin tip="Loading..." size="large" />
    </div>
  );

  const getClassRoomView = () => {
    return <>
    <Conference handleLeaveRoom={handleLeaveRoom}/>
    <HmsFooter showParticipantList={showParticipantList} handleShowParticipantList={() => setShowParticipantList(true)} />
    <ParticipantList users={users} showParticipantList={showParticipantList} handleCloseParticipantList={() => setShowParticipantList(false)} />
    </>
  }
  return (
    <div className="interactive-class-container">
      {!isConnected ? getLoader() : <div className="classroom-container">
        {getClassRoomView()}
        </div>}
    </div>
  );
};

export default InteractiveClass;
