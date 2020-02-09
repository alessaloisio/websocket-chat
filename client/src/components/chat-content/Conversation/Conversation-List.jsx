import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const ConversationList = props => {
  const { message, users } = props;

  let user;
  const owner = props.user._id === message.owner;

  if (!owner) {
    user = users.filter(user => user._id === message.owner)[0];
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

export default connect(state => ({
  user: state.user.data,
  users: state.room.data.users_info
}))(ConversationList);
