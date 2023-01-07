import {
  Button,
  Spin,
  Modal,
  Form,
  Typography,
  DatePicker,
  Space,
  TimePicker,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./roomList.css";
import { useState, useEffect } from "react";
import InputWithLabel from "../../components/InputWithLabel";
import {
  EMPTY_FIELD_ERROR,
  RESERVED_UNDERSCORE_ERROR,
} from "../../configs/constants";
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
import moment from 'moment';

const { Title, Text } = Typography;
dayjs.extend(customParseFormat);

const RoomList = () => {
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [isroomListLoading, setIsRoomListLoading] = useState(true);
  const [showCreateRoomBtn, setShowCreateRoomBtn] = useState(false);

  const routeParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoomsList();
    checkCreateRoomAccess();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form] = Form.useForm();

  const { product } = routeParams;

  const createRoomHeadingAndLabel = `Create new ${product} classroom`;

  const checkCreateRoomAccess = async () => {
    try {
      const { data } = await HttpServices.getRequest(CREATE_ROOM_AUTH_ENDPOINT);
      setShowCreateRoomBtn(data.createRoom);
    } catch (e) {
      console.error("Error while verfiying if user can create room", e);
    }
  }

  const handleCreateRoomSubmit = () => {
    if (checkForErrors()) {
      return;
    }
    createRoom();
  };

  const checkForErrors = () => {
    const errorsMessage = {},
      showErrorMessages = {};
    const { name, description } = roomDetails;
    if (!name) {
      errorsMessage.name = EMPTY_FIELD_ERROR;
      showErrorMessages.name = true;
    }

    if (name && name.includes("_")) {
      errorsMessage.name = RESERVED_UNDERSCORE_ERROR;
      showErrorMessages.name = true;
    }

    if (!description) {
      errorsMessage.description = EMPTY_FIELD_ERROR;
      showErrorMessages.description = true;
    }
    setErrors(errorsMessage);
    setShowErrors(showErrorMessages);
    if (Object.keys(errorsMessage).length) {
      return true;
    }
    return false;
  };

  const handleInputChange = (key, value) => {
    const obj = {
      ...roomDetails,
    };
    obj[key] = value;
    setRoomDetails(obj);
  };

  const handleDateAndTimeChange = (key, value, valueStr) => {
    const obj = {
      ...roomDetails,
    };
    obj[key] = value;
    obj[`${key}Str`] = JSON.stringify(valueStr);
    
    setRoomDetails(obj);
  };


  const createRoom = async () => {
    try {
      setIsCreatingRoom(true);
      const { data } = await HttpServices.postRequest(CREATE_ROOM_ENDPOINT, {
        ...roomDetails,
        product,
      });
      const roomListCopy = [data, ...roomList];
      setRoomList(roomListCopy);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingRoom(false);
      setShowCreateRoomModal(false);
    }
  };

  const fetchRoomsList = async () => {
    try {
      const { data } = await HttpServices.getRequest(FETCH_ROOM_LIST(product));
      setRoomList(data);
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
    <div className="room-list-container">
      <div className="btn-container">
        <div className="room-title" level={5}>{`Room List`}</div>
        {showCreateRoomBtn && <Button onClick={() => setShowCreateRoomModal(true)}>
          {createRoomHeadingAndLabel}
        </Button>}
      </div>

      {isroomListLoading ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <div>
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
        </div>
      )}

      <Modal
        title={createRoomHeadingAndLabel}
        open={showCreateRoomModal}
        onOk={handleCreateRoomSubmit}
        onCancel={() => setShowCreateRoomModal(false)}
        okButtonProps={{ disabled: isCreatingRoom }}
        cancelButtonProps={{ disabled: isCreatingRoom }}
        okText="Submit"
        confirmLoading={isCreatingRoom}
      >
        <Form
          onFinish={handleCreateRoomSubmit}
          //   {...formItemLayout}
          layout="vertical"
          form={form}
        >
          <InputWithLabel
            label="Name"
            value={roomDetails.name}
            onInputChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter Room Name"
            helperText={errors.name}
            showError={showErrors.name}
          />
          <InputWithLabel
            label="Description"
            value={roomDetails.description}
            onInputChange={(e) =>
              handleInputChange("description", e.target.value)
            }
            placeholder="Enter Room Description"
            helperText={errors.description}
            showError={showErrors.description}
          />
          <div className="date-time">
            <Space className="vertical">
              <Text>Date</Text>
              <DatePicker
                onChange={(dateValue, dateStr) => handleDateAndTimeChange("date",  dateValue, dateStr)}
                value={roomDetails.date}
              />
            </Space>
            <Space className="vertical">
              <Text>Start and End Time</Text>
              <TimePicker.RangePicker
                onChange={(value, str) => handleDateAndTimeChange("time", value, str)}
                value={roomDetails.time}
              />
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
