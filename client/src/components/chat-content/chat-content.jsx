import React, { useEffect } from "react";
import { connect } from "react-redux";

import { addMessage } from "../../redux/actions/room";

import WidgetConversation from "./Widget-Conversation";
import WidgetInput from "./Widget-Input";

import imageNoRoom from "../../assets/images/noRoom.svg";
import "./chat-content.scss";

const ChatContent = props => {
  const { io, dispatch, room } = props;

  useEffect(() => {
    io &&
      io.on("newMessage", data => {
        console.log(data);
        dispatch(addMessage(data));
      });
  }, [io]);

  const contentShow = () => {
    if (room)
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
  room: state.room.data,
  io: state.socket
}))(ChatContent);
