import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import ParticipantDetails from '../ParticipantDetails';

const ParticipantList = ({ handleCloseParticipantList, showParticipantList, users }) => {

  return (
    <>
      <Drawer
        title={`Participants (${users.length})`}
        placement="right"
        width={300}
        onClose={handleCloseParticipantList}
        open={showParticipantList}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
        {users.map(userObj => <ParticipantDetails name={userObj.name} />)}
      </Drawer>
    </>
  );
};
export default ParticipantList;