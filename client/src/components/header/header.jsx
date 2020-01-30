import React from "react";
import { connect } from "react-redux";

import { userLogoutComplete } from "../../redux/actions/user";

import "./header.scss";

const Header = props => {
  const handleLogout = () => {
    props.dispatch(userLogoutComplete());
  };

  return (
    <div className="Header">
      <span className="Logo">Online Chat</span>
      <div className="Profil">
        <i className="Notification flaticon-notification"></i>
        <span className="Avatar">
          <img src={props.user.info.avatar} alt="User avatar" />
        </span>
        <i className="Arrow flaticon-down-arrow"></i>

        <p className="btn" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default connect(state => ({
  user: state.app.user
}))(Header);
