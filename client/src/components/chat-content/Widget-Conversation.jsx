import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import ConversationHeader from "./Conversation-Header";
import ConversationList from "./Conversation-List";

const WidgetConversation = props => {
  const { dispatch, room } = props;

  const type = room.group ? "group" : "user";
  const users = room.users_info;

  const contentRef = useRef();

  // Scrool down when new message
  useEffect(() => {
    const lastChild = contentRef.current.lastChild;
    if (lastChild)
      lastChild.scrollIntoView({
        behavior: "smooth"
      });
  }, [room.messages]);

  return (
    <div className="Widget-Conversation">
      {/* Conversation Options (filters, favourites, manage) */}
      <ConversationHeader />

      {/* Conversation Informations (speakers, owner, name, description) */}
      <div className="conversation-informations">
        <p className="name">{users[0].info.name}</p>
        <p className="description">{users[0].info.bio}</p>
      </div>

      {/* Lists messages + Lists files uploaded */}
      <div className="conversation-content">
        <div className="messages">
          <ul ref={contentRef}>
            {room.messages.map(msg => (
              <ConversationList message={msg} />
            ))}
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
