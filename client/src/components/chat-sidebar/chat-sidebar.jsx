import React from "react";

import List from "./chat-widget-list";

import "./chat-sidebar.scss";

const list = [
  { username: "Alessio", avatar: "https://i.pravatar.cc/32", unread: 4 },
  { username: "Serge", avatar: "https://i.pravatar.cc/32", unread: 2 }
];

export default () => {
  return (
    <div className="Chat-Sidebar">
      {/* User status */}
      <div className="Widget-User">
        <div className="status">
          <span className="active"></span>
        </div>
        <div className="info">
          <p className="name">Alessandro Aloisio</p>
          <p className="description">FullStack Web Developer</p>
        </div>
      </div>
      {/* Search */}
      <div className="Widget-Search">
        <input type="text" placeholder="Search" />
        <button>
          <i className="flaticon-loupe"></i>
        </button>
      </div>
      <List name="Favorites" list={list} />
      {/* Groupes */}
      <List name="Groupes" list={list} />
      {/* Users */}
      <List name="Friends" list={list} />
    </div>
  );
};
