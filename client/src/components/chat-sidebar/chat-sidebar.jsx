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
  const userId = useSelector(state => state.user.data._id);

  useEffect(() => {
    let event;
    if (io && sidebar) {
      event = io.on("userStatus", data => {
        const send = {};
        send.room = data.userId * userId; // recipient
        send.data = { "users_info.status": data.status };

        dispatch(updateElementList(send));
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
