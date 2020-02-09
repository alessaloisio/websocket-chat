import React from "react";

import { useSelector } from "react-redux";

const ConversationInformations = () => {
  const room = useSelector(state => state.room.data);

  const roomInfo = room.group ? room.group : room.users_info[0];

  return (
    <div className="conversation-informations">
      <div className="room-info">
        <div className="room-avatar">
          <img src={roomInfo.info.avatar} alt="Room avatar" />
        </div>
        <div className="room-name">
          <p className="name">{roomInfo.info.name}</p>
          <p className="description">{roomInfo.info.bio}</p>
        </div>
      </div>

      {room.group && (
        <div className="users-infos">
          <p>Users : </p>
          {room.users_info.map(user => (
            <div className="avatar">
              <img
                src={user.info.avatar}
                alt="User avatar"
                title={user.info.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationInformations;
