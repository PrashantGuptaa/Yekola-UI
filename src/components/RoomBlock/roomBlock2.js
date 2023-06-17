// import product from '../../assets/images/product1.png';
import product from "../../assets/images/product2.png";
// import product from '../../assets/images/product3.png';

import "./roomBlock2.css";
import Typography from "antd/es/typography/Typography";
import { HiChevronRight } from "react-icons/hi";
import moment from "moment";

const { Text } = Typography;

const RoomBlock2 = ({ roomObj, handleJoinRoom }) => {
  const {
    name,
    description,
    roomId,
    createdBy,
    instructor,
    loading,
    startDateTime,
    endDateTime,
  } = roomObj;

  const isRoomDisabled = (start, end) => moment().isBetween(start, end, "minute", '[]');

  // const disabled = isRoomDisabled(startDateTime, endDateTime);
const disabled = false;
  const getDate = (dateTime) => {
    if (!dateTime) return "";
    const dateStr = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toLocaleTimeString();

    return `${dateStr.slice(dateStr.indexOf(" "))} ${time}`;
    // return (new Date(date)).toLocaleString();
  };
  return (
    <div className="card-container">
      <div className="room-img-container">
        <img src={product} alt="product-img" className="room-img" />
      </div>
      <div className="room-details">
        <Text className="class-name">{name}</Text>
        <Text type="secondary">{description}</Text>
        <div className="row">
          <Text>Instructor:&nbsp; </Text>
          <Text type="secondary">{instructor}</Text>
        </div>
        <div className="row">
          <Text>Start:&nbsp; </Text>
          <Text type="secondary">{getDate(startDateTime)}</Text>
        </div>
        <div className="row">
          <Text>End:&nbsp; </Text>
          <Text type="secondary">{getDate(endDateTime)}</Text>
        </div>
      </div>
      <button
        className="btm-section"
        disabled={disabled}
        loading={loading}
        onClick={() => handleJoinRoom(roomId, name)}
      >
        Start Learning
        <HiChevronRight />
      </button>
    </div>
  );
};

export default RoomBlock2;
