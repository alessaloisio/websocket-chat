import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import ConversationHeader from "./Conversation-Header";
import ConversationInformations from "./Conversation-Informations";
import ConversationList from "./Conversation-List";

import "./Widget-Conversation.scss";

const WidgetConversation = () => {
  const room = useSelector(state => state.room.data);

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
      <ConversationInformations />

      {/* Lists messages + Lists files uploaded */}
      <div className="conversation-content">
        <div className="messages">
          <ul ref={contentRef}>
            {room.messages &&
              room.messages.map(msg => <ConversationList message={msg} />)}
          </ul>
        </div>

        {/* TODO: show sending files */}
        {room.files && room.files.length > 0 && (
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

export default WidgetConversation;
