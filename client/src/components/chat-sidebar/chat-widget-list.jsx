import React from "react";

import "./chat-widget-list.scss";

export default props => {
  const getElements = props.list.map(element => (
    <li>
      <span className="avatar">
        <img src={element.avatar} alt="User avatar" />
        {element.status && (
          <div className="status">
            <span className={element.status}></span>
          </div>
        )}
      </span>
      <span className="name">{element.username}</span>
      <span className="unread">
        <span className="number">{element.unread}</span>
      </span>
    </li>
  ));

  return (
    <div className="Widget-Lists">
      <div className="title">{props.name}</div>
      <ul className="list">{getElements}</ul>
    </div>
  );
};
