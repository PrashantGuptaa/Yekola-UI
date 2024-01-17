// import product from '../../assets/images/product1.png';
import product from "../../assets/images/product4.png";
// import product from '../../assets/images/product3.png';

import "./roomBlock2.css";
import Typography from "antd/es/typography/Typography";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const RoomBlock2 = ({ roomObj, handleJoinRoom, handleShowDeleteModal, showDeleteBtn }) => {
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

  const disabled = false;
  const getDate = (dateTime) => {
    if (!dateTime) return "";
    const dateStr = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toLocaleTimeString();

    return `${dateStr.slice(dateStr.indexOf(" "))} ${time}`;
    // return (new Date(date)).toLocaleString();
  };

  const actions = [
    <Button
    className="btn-section"
    style={{
            fontSize: 16,
            
          }}
          disabled={disabled}
          loading={loading}
          onClick={() => handleJoinRoom(roomId, name)}
        >
          Start Learning
        </Button>
  ]

  if (showDeleteBtn) {
    actions.push(  <DeleteOutlined
      key="delete"
      onClick={() => handleShowDeleteModal({ roomId, name })}
    />)
  }
  
  return (
    <Card
      style={{
        width: 300,
        boxShadow: "1px 1px 3px 0px gray",
      }}
      bordered={true}
      actions={actions}
      cover={<img alt="product-img" src={product} />}
    >
      <Meta
        title={name}
        description={
          <>
            <Text type="secondary">{description}</Text>
            <div className="row">
              <Text>Start:&nbsp; </Text>
              <Text type="secondary">{getDate(startDateTime)}</Text>
            </div>
            <div className="row">
              <Text>End:&nbsp; </Text>
              <Text type="secondary">{getDate(endDateTime)}</Text>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default RoomBlock2;
