import { Avatar, Typography } from "antd";
import './participantDetails.css';
import { getNameIntials, getRandomAvatarColor } from "../../utils/helperFuncs";
const { Text } = Typography;

const ParticipantDetails = ({ name }) => {
  return (
    <div className="participant-detail-container">
      <Avatar
        // className="room-block-image"
        style={{
          backgroundColor: getRandomAvatarColor(),
        }}
        size="medium"
      >
        {getNameIntials(name)}
      </Avatar>
      <Text strong>{name}</Text>
    </div>
  );
};

export default ParticipantDetails;
