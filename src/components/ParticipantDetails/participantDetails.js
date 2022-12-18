import { Avatar, Button, Typography } from "antd";
import './participantDetails.css';
import { getNameIntials, getRandomAvatarColor } from "../../utils/helperFuncs";
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    selectPeers, 
    selectLocalPeer
  } from "@100mslive/react-sdk";
  const { Text } = Typography;

const ParticipantDetails = ({ peer }) => {
    const { name } = peer;
  const localPeer = useHMSStore(selectLocalPeer);
  const { roleName } = localPeer;

  return (
    <div className="participant-detail-container">
        <div className="user-section">
      <Avatar
        // className="room-block-image"
        style={{
          backgroundColor: getRandomAvatarColor(peer.name),
        }}
        size="medium"
      >
        {getNameIntials(name)}
      </Avatar>
      <Text strong>{name}</Text>
      </div>
      {
      roleName === 'Moderator' && 
      <Button  type="primary">Unmute</Button>
      }
    </div>
  );
};

export default ParticipantDetails;
