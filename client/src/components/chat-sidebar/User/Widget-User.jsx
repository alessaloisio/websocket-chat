import React from "react";
import { useSelector } from "react-redux";

import "./Widget-User.scss";

const WidgetUser = () => {
  const user = useSelector(state => state.user.data);

  return (
    <div className="Widget-User">
      <div className="status">
        <span className="active"></span>
      </div>
      <div className="info">
        <p className="name">{user.info.name}</p>
        <p className="description">{user.info.bio}</p>
      </div>
    </div>
  );
};

export default WidgetUser;
