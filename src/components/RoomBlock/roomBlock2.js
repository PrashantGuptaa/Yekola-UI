// import product from '../../assets/images/product1.png';
import product from "../../assets/images/product2.png";
// import product from '../../assets/images/product3.png';

import "./roomBlock2.css";
import Typography from "antd/es/typography/Typography";
import { Button } from "antd";
import { HiChevronRight } from "react-icons/hi";

const { Text } = Typography;

const RoomBlock2 = ({ roomObj, handleJoinRoom }) => {
  const {
    name,
    description,
    roomId,
    createdBy,
    instructor,
    loading,
    disabled,
    timeStr: timeArr,
    dateStr,
  } = roomObj;
  const startTime = timeArr?.[0];
  const endTime = timeArr?.[1];
  return (
    <div className="card-container">
      <div className="room-img-container">
        <img src={product} alt="product-img" className="room-img" />
      </div>
      <div className="room-details">
        <Text className="class-name">{name}</Text>
        <Text type="secondary">{description}</Text>

        <Text>Date: {dateStr}</Text>
        <div className="time-section">
          <Text>Start Time: {startTime}</Text>
          <Text>End Time: {endTime}</Text>
        </div>
      </div>
      <button
        className="btm-section"
        disabled={disabled}
        loading={loading}
        onClick={() => handleJoinRoom(roomId, name)}
      >
        <div>Start Learning </div>
        <HiChevronRight />
      </button>
    </div>
  );
};

export default RoomBlock2;
