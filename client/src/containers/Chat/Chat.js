import React from "react";

import Sidebar from "../../components/sidebar/sidebar-chat";
import Content from "../../components/content/content-chat";

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
