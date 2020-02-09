import React from "react";

import WidgetUser from "./User/Widget-User";
import WidgetSearch from "./Search/Widget-Search";
import WidgetLists from "./Lists/Widget-Lists";

import "./chat-sidebar.scss";

const Sidebar = () => (
  <div className="Chat-Sidebar">
    <WidgetUser />
    <WidgetSearch />
    <WidgetLists />
  </div>
);

export default Sidebar;
