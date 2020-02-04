import React from "react";
import { connect } from "react-redux";

import ConversationList from "./Conversation-List";

const WidgetConversation = props => {
  const { room } = props;
  const users = room.users_info;

  return (
    <div className="Widget-Conversation">
      {/* Conversation Options (filters, favourites, manage) */}
      <div className="conversation-options">
        <div className="btn filter">
          <i className="flaticon-filter"></i>
          Filter
        </div>

        <div className="search-message">
          <span className="btn search-button">Search:</span>
          <input type="text" />
        </div>

        <div className="right-options">
          <i className="favorites flaticon-star active"></i>
          <div className="more-options">
            <i className="flaticon-menu"></i>
          </div>
        </div>
      </div>

      {/* Conversation Informations (speakers, owner, name, description) */}
      <div className="conversation-informations">
        <p className="name">{users[0].info.name}</p>
        <p className="description">{users[0].info.bio}</p>
      </div>

      {/* Lists messages + Lists files uploaded */}
      <div className="conversation-content">
        <div className="messages">
          <ul>
            {room.messages.map(msg => (
              <ConversationList message={msg} />
            ))}

            {/* <li className="msg">
              <div className="avatar">
                <img src="https://i.pravatar.cc/64" alt="" />
              </div>
              <div className="wrapper">
                <div className="head">
                  <p className="name">Serge</p>
                  <p className="datetime">3 days ago</p>
                </div>
                <p className="message">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  non magnam nostrum id earum itaque minima cumque distinctio
                  iusto! Repudiandae, ullam corporis! Quibusdam impedit in
                  deleniti nobis placeat sed? Blanditiis?
                </p>
              </div>
            </li>
            <li className="msg mine">
              <div className="wrapper">
                <p className="message">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </li> */}
          </ul>
        </div>

        {room.files.length > 0 && (
          <div className="files">
            <ul>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(state => ({
  room: state.room.data
}))(WidgetConversation);
