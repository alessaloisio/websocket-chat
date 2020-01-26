import React from "react";

import "./header.scss";

export default function header() {
  return (
    <div className="Header">
      <span className="Logo">Online Chat</span>
      <div className="Profil">
        <a href="https://github.com/login/oauth/authorize?client_id=3ab9455d01b047c53a43">
          Github
        </a>
        <i className="Notification flaticon-notification"></i>
        <span className="Avatar">
          <img src="https://i.pravatar.cc/64" alt="User avatar" />
        </span>
        <i className="Arrow flaticon-down-arrow"></i>
      </div>
    </div>
  );
}
