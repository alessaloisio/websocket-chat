import React from "react";
import { connect } from "react-redux";

import WidgetConversation from "./Widget-Conversation";
import WidgetInput from "./Widget-Input";

import imageNoRoom from "../../assets/images/noRoom.svg";
import "./chat-content.scss";

const ChatContent = props => {
  const contentShow = () => {
    if (props.room)
      return (
        <>
          <WidgetConversation />
          <WidgetInput />
        </>
      );

    return (
      <>
        <img src={imageNoRoom} alt="No room selected image" />
      </>
    );
  };

  return <div className="Chat-Content">{contentShow()}</div>;
};

export default connect(state => ({
  room: state.room.data
}))(ChatContent);
