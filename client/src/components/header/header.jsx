import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { userLogoutComplete } from "../../redux/actions/user";
import { socketDisconnect } from "../../redux/actions/socket";

import "./header.scss";

const Header = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  const handleLogout = () => {
    dispatch(socketDisconnect());
    dispatch(userLogoutComplete());
  };

  return (
    <div className="Header">
      <span className="Logo">Online Chat</span>
      <div className="Profil">
        <i className="Notification flaticon-notification"></i>
        <span className="Avatar">
          <img src={user.info.avatar} alt="User avatar" />
        </span>
        <i className="Arrow flaticon-down-arrow"></i>

        <p className="btn" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
