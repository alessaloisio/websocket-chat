import React from "react";
import { connect } from "react-redux";

import WidgetSearch from "./Widget-Search";
import WidgetLists from "./Widget-Lists";

import "./chat-sidebar.scss";

const Sidebar = ({ user }) => {
  return (
    <div className="Chat-Sidebar">
      {/* User status */}
      <div className="Widget-User">
        <div className="status">
          <span className="active"></span>
        </div>
        <div className="info">
          <p className="name">{user.info.name}</p>
          <p className="description">{user.info.bio}</p>
        </div>
      </div>

      <WidgetSearch />
      <WidgetLists />
    </div>
  );
};

export default connect(state => ({
  user: state.user.data
}))(Sidebar);
