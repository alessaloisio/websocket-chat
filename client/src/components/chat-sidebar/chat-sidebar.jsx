import React from "react";

import List from "./chat-widget-list";

const list = [
  { username: "Alessio", avatar: "https://i.pravatar.cc/32", unread: 4 },
  { username: "Serge", avatar: "https://i.pravatar.cc/32", unread: 2 }
];

export default () => {
  return (
    <div>
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
        <div className="input-search">
          <input type="text" />
          <button>
            <i className="flaticon-loupe"></i>
          </button>
        </div>
      </div>
      {/* Groupes */}
      <List name="Groupes" list={list} />
      {/* Users */}
      <List name="Users" list={list} />
    </div>
  );
};
