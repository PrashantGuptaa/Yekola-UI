import "./roomBlock.css";
import profileImg from "../../assets/images/profile.png";
import { Button } from "antd";

const RoomBlock = ({ roomObj, handleJoinRoom }) => {
  const {
    name,
    description,
    roomId,
    createdBy,
    instructor,
    loading,
    disabled,
  } = roomObj;

  return (
    <div className="room-block-container">
      <div className="room-data">
        <div className="block-image-container">
          <img src={profileImg} alt="Profile" className="room-block-image" />
        </div>
        <div className="room-info">
          <div>
            <span className="room-text-data">Room Name: </span>
            {name}
          </div>
          <div>
            <span className="room-text-data">Description: </span>
            {description}
          </div>
          <div>
            <span className="room-text-data">Instructor: </span>
            {instructor || createdBy}
          </div>
        </div>
      </div>
      <Button
        className="join-btn"
        disabled={disabled}
        loading={loading}
        onClick={() => handleJoinRoom(roomId)}
      >
        Join Room
      </Button>
    </div>
  );
};

export default RoomBlock;
