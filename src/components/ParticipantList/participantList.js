import React, { useState } from "react";
import { Button, Drawer, List, Avatar, Space } from "antd";
import ParticipantDetails from "../ParticipantDetails";
import {
  getLocalUserName,
  getNameIntials,
  getRandomAvatarColor,
} from "../../utils/helperFuncs";
import Link from "antd/es/typography/Link";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectLocalPeer,
  selectPermissions,
  selectIsAllowedToSubscribe,
  selectRoleChangeRequest,
  selectRolesMap,
} from "@100mslive/react-sdk";
import { IoIosHand } from "react-icons/io";

const ParticipantList = ({
  handleCloseParticipantList,
  showParticipantList,
  users,
}) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const { roleName: localUserRoleName, id: localPeerId } = localPeer;
  const permissions = useHMSStore(selectPermissions);
  const roleMap = useHMSStore(selectRolesMap);
  const roleChange = useHMSStore(selectRoleChangeRequest);
  const hmsActions = useHMSActions();
  console.log("F-12 Local permission", permissions, localPeer);

  const handleRoleChangeAction = async (id, roleName) => {
    try {
      const result = await hmsActions.changeRole(id, roleName, true);
      console.log("F-6", result);
    } catch (e) {
      console.error("Error in role change request", e);
    }
  };

  const isHandRaisedForThisPeer = (peer) => {
    const peerMetaData = JSON.parse(peer?.metadata || "{}");
    console.log("Peer meta data f-13", peer, peerMetaData);
    return peerMetaData?.isHandRaised;
  };
  return (
    <Drawer
      title={`Participants (${users.length})`}
      placement="right"
      width={350}
      onClose={handleCloseParticipantList}
      open={showParticipantList}
    >
      <List
        dataSource={users}
        renderItem={(peer) => (
          <List.Item key={peer.id} style={{ padding: "5px" }}>
            <List.Item.Meta
              className="horizontal-center"
              avatar={
                <Avatar
                  style={{
                    backgroundColor: getRandomAvatarColor(peer.name),
                  }}
                  size="medium"
                >
                  {getNameIntials(peer.name)}
                </Avatar>
              }
              title={
                <Space className="user-name">
                  {getLocalUserName(peer)}
                  {isHandRaisedForThisPeer(peer) && (
                    <IoIosHand className="st-icon raise" />
                  )}
                </Space>
              }
              description={<span className="capitalize">{peer.roleName}</span>}
            />
            {localUserRoleName === "moderator" && localPeerId !== peer.id && (
              <Link>
                {peer.roleName === "speaker" ? (
                  <span
                    onClick={() => handleRoleChangeAction(peer.id, "student")}
                  >
                    Mute
                  </span>
                ) : (
                  <span
                    onClick={() => handleRoleChangeAction(peer.id, "speaker")}
                  >
                    Unmute
                  </span>
                )}
              </Link>
            )}
          </List.Item>
        )}
      />
      {/* {users.map(userObj => <ParticipantDetails peer={userObj} />)} */}
    </Drawer>
  );
};
export default ParticipantList;
