import React from "react";

import Sidebar from "../../components/chat-sidebar/chat-sidebar";
import Content from "../../components/chat-content/chat-content";

import "./Chat.scss";

const Chat = () => {
  return (
    <div className="Chat">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Chat;
