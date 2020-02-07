import React from "react";
import { connect } from "react-redux";

const ConversationInformations = props => {
  const { dispatch, room } = props;

  const roomInfo = room.group ? room.group : room.users_info[0];

  return (
    <div className="conversation-informations">
      <p className="name">{roomInfo.info.name}</p>
      <p className="description">{roomInfo.info.bio}</p>
    </div>
  );
};

export default connect(state => ({
  room: state.room.data
}))(ConversationInformations);
