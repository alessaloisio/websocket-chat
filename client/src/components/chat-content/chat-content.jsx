import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/actions/room";

import WidgetConversation from "./Conversation/Widget-Conversation";
import WidgetInput from "./Input/Widget-Input";

import imageNoRoom from "../../assets/images/noRoom.svg";
import "./chat-content.scss";

const ChatContent = () => {
  const dispatch = useDispatch();
  const io = useSelector(state => state.socket);
  const room = useSelector(state => state.room.data);

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

    // TODO: user are not on any room, send a notification

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

export default ChatContent;
