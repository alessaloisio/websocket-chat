import React from "react";

import List from "./chat-widget-list";

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
      <List name="Groupes" />
      {/* Users */}
      <List name="Users" />
    </div>
  );
};
