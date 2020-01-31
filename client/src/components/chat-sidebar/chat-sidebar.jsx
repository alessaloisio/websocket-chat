import React, { useState } from "react";
import { connect } from "react-redux";

import WidgetSearch from "./Widget-Search";
import List from "./chat-widget-list";

import "./chat-sidebar.scss";

const list = [
  {
    username: "Alessio",
    avatar: "https://i.pravatar.cc/32",
    status: "online",
    unread: 4
  },
  {
    username: "Serge",
    avatar: "https://i.pravatar.cc/32",
    status: "offline",
    unread: 2
  },
  {
    username: "Alicia",
    avatar: "https://i.pravatar.cc/32",
    status: "busy",
    unread: 2
  }
];

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

      <List name="Favorites" list={list} />
      {/* Groupes */}
      <List name="Groupes" list={list} />
      {/* Users */}
      <List name="Peoples" list={list} />
    </div>
  );
};

export default connect(state => ({
  user: state.app.user
}))(Sidebar);
