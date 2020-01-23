import React from "react";

export default function header() {
  return (
    <div className="Header">
      <div className="Logo">
        <h1>Online Chat</h1>
      </div>
      <div className="Profil">
        <i className="flaticon-notification"></i>
        <span className="Avatar">
          <img src="https://i.pravatar.cc/64" alt="User avatar" />
        </span>
        <i className="flaticon-down-arrow"></i>
      </div>
    </div>
  );
}
