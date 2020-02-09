import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateElementList } from "../../redux/actions/sidebar";

import WidgetUser from "./User/Widget-User";
import WidgetSearch from "./Search/Widget-Search";
import WidgetLists from "./Lists/Widget-Lists";

import "./chat-sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const io = useSelector(state => state.socket);
  const sidebar = useSelector(state => state.sidebar.data);

  useEffect(() => {
    // user are on the room, show the message
    let event;
    if (io && sidebar) {
      event = io.on("userStatus", data => {
        dispatch(updateElementList(data));
      });
    }

    return () => {
      if (event) event.removeListener();
    };
  }, [io, sidebar]);

  return (
    <div className="Chat-Sidebar">
      <WidgetUser />
      <WidgetSearch />
      <WidgetLists />
    </div>
  );
};

export default Sidebar;
