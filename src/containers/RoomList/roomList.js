import { Button, message, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./roomList.css";
import { useState, useEffect } from "react";
import HttpServices from "../../configs/https.service";
import {
  CREATE_ROOM_AUTH_ENDPOINT,
  CREATE_ROOM_ENDPOINT,
  FETCH_ROOM_LIST,
} from "../../configs/apiEndpoints";
import RoomBlock from "../../components/RoomBlock";
import roomNotFound from "../../assets/images/roomNotFound.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AddRoomModal from "../../components/addRoomModal";
import { get } from "lodash";

const { Title, Text } = Typography;
dayjs.extend(customParseFormat);

const RoomList = () => {
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [isroomListLoading, setIsRoomListLoading] = useState(true);
  const [showCreateRoomBtn, setShowCreateRoomBtn] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const routeParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    fetchRoomsList();
    checkCreateRoomAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { product } = routeParams;

  const createRoomHeadingAndLabel = `Create new ${product} classroom`;

  const checkCreateRoomAccess = async () => {
    try {
      const { data } = await HttpServices.getRequest(CREATE_ROOM_AUTH_ENDPOINT);
      setShowCreateRoomBtn(get(data, ["data", "roomEditAllowed"]));
    } catch (e) {
      console.error("Error while verfiying if user can create room", e);
    }
  };

  const createRoom = async (roomDetails) => {
    try {
      setIsCreatingRoom(true);
      await HttpServices.postRequest(CREATE_ROOM_ENDPOINT, {
        ...roomDetails,
        product,
      });
    } catch (e) {
      console.error(e);
      const errorMsg = get(e, ['response', 'data', 'message']);
      message.error(errorMsg);
    } finally {
      await fetchRoomsList();
      setIsCreatingRoom(false);
      setShowCreateRoomModal(false);
    }
  };

  const fetchRoomsList = async () => {
    try {
      const { data: { data: roomList } } = await HttpServices.getRequest(FETCH_ROOM_LIST(pageNum, 10));
      console.log("Room List data , f-4", roomList);
      setRoomList(roomList);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRoomListLoading(false);
    }
  };

  const handleJoinRoom = async (roomId, roomName) => {
    navigate(`/class-room/${product}/${roomName}/${roomId}`);
  };

  return (
    <div className="room-list-container" id="room-list-container">
      <div className="btn-container">
        <div className="room-title">{`Room List`}</div>
        {showCreateRoomBtn && (
          <Button type="primary" onClick={() => setShowCreateRoomModal(true)}>
            {createRoomHeadingAndLabel}
          </Button>
        )}
      </div>

      {isroomListLoading ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <>
          <div className="room-list">
            {roomList.map((roomObj) => (
              <RoomBlock
                roomObj={roomObj}
                key={roomObj.roomId}
                handleJoinRoom={handleJoinRoom}
              />
            ))}
          </div>
          {!isroomListLoading && !roomList?.length && (
            <div className="room-not-found">
              <img
                src={roomNotFound}
                alt="Room not found"
                className="room-not-found-image"
              />
              <Title level={3}>No Class Room found</Title>
            </div>
          )}
        </>
      )}

      <AddRoomModal
        showCreateRoomModal={showCreateRoomModal}
        handleCreateRoomSubmit={createRoom}
        handleCloseCreateRoomModal={() => setShowCreateRoomModal(false)}
        isCreatingRoom={isCreatingRoom}
      />
    </div>
  );
};

export default RoomList;
