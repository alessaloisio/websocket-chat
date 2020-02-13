import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const ConversationList = props => {
  const { message } = props;

  const currentUser = useSelector(state => state.user.data);
  const room = useSelector(state => state.room.data);

  const owner = currentUser._id === message.owner;

  let user;
  if (!owner) {
    if (room.group) {
      user = room.users_info[message.owner];
    } else {
      user = room.users_info;
    }
  }

  return (
    <li key={message._id} className={`msg ${owner ? "mine" : ""}`}>
      {!owner && (
        <div className="avatar">
          <img src={user.info.avatar} alt={`${user.info.name} avatar`} />
        </div>
      )}

      <div className="wrapper">
        {!owner && (
          <div className="head">
            <p className="name">{user.info.name}</p>
            <p className="datetime">{moment(message.createdAt).fromNow()}</p>
          </div>
        )}

        <p className="message">{message.content}</p>
      </div>
    </li>
  );
};

export default ConversationList;
