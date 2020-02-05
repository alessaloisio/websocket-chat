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
    // user are on the room, show the message
    let event;
    if (io && room) {
      event = io.on("newMessage", data => {
        if (data.room === room._id) dispatch(addMessage(data));
        else {
          console.log(data);
          console.log(room);
          console.log("TODO: send notification/ create un fn !");
        }
      });
    }

    // user are not on any room, send a notification

    return () => {
      if (event) event.removeListener();
    };
  }, [io, room]);

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
