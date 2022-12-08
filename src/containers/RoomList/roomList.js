import { Button, Spin, Modal, Form } from "antd";
import { useParams } from "react-router-dom";
import "./roomList.css";
import { useState, useEffect } from "react";
import InputWithLabel from "../../components/InputWithLabel";
import { EMPTY_FIELD_ERROR } from "../../configs/constants";
import HttpServices from "../../configs/https.service";
import {
  CREATE_ROOM_ENDPOINT,
  FETCH_ROOM_LIST,
} from "../../configs/apiEndpoints";
import RoomBlock from "../../components/RoomBlock";

const RoomList = () => {
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const routeParams = useParams();

  useEffect(() => {
    fetchRoomsList();
  }, []);

  const [form] = Form.useForm();

  const { product } = routeParams;

  const createRoomHeadingAndLabel = `Create ${product} Room`;

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
    }
  };

  return (
    <div className="room-list-container">
      <div className="btn-container">
        <div className="room-title" level={5}>{`Room List`}</div>
        <Button type="primary" onClick={() => setShowCreateRoomModal(true)}>
          {createRoomHeadingAndLabel}
        </Button>
      </div>

      {!roomList.length ? (
        <div className="complete-center">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <div className="room-list">
          {roomList.map((roomObj) => (
            <RoomBlock roomObj={roomObj} key={roomObj.roomId} />
          ))}
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
        </Form>
      </Modal>
    </div>
  );
};

export default RoomList;
