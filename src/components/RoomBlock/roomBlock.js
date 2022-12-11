import "./roomBlock.css";
import profileImg from "../../assets/images/profile.png";
import { Avatar, Button } from "antd";

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

  console.log("F-1", roomObj);

  const getRandomAvatarColor = () => {
    const colors = [
      "#f04900",
      "#d21b8b",
      "red",
      "#0053a5",
      "black",
      "#407806",
      "purple",
      "darkblue",
      "green",
      "darkgreen",
    ];
    return colors[Math.round(Math.random() * 10)];
  };

  const getInstructorName = () => instructor || createdBy;

  return (
    <div className="room-block-container">
      <div className="room-data">
        <div className="block-image-container">
          {/* <img src={profileImg} alt="Profile" className="room-block-image" /> */}
          <Avatar
            className="room-block-image"
            style={{
              backgroundColor: getRandomAvatarColor(),
              verticalAlign: "middle",
            }}
            size="large"
          >
            {getInstructorName()[0]}
          </Avatar>
        </div>
        <div className="room-info">
          <div>
            {/* <span className="room-text-data">Room Name: </span> */}
            {name}
          </div>
          <div className="room-text-data">
            {/* <span className="room-text-data">Description: </span> */}
            {description}
          </div>
          <div className="instructor-name">
            <span className="room-text-data">Instructor: </span>
            {getInstructorName()}
          </div>
        </div>
      </div>
      <Button
        // className="join-btn"
        type="primary"
        disabled={disabled}
        loading={loading}
        onClick={() => handleJoinRoom(roomId, name)}
      >
        Join Classroom
      </Button>
    </div>
  );
};

export default RoomBlock;
