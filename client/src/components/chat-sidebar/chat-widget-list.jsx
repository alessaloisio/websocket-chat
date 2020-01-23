import React from "react";

export default props => {
  const getElements = props.list.map(element => (
    <li>
      <span className="avatar">
        <img src={element.avatar} alt="User avatar" />
      </span>
      <span className="name">{element.username}</span>
      <span className="unread">{element.unread}</span>
    </li>
  ));

  return (
    <div className="Widget-Lists">
      <div className="title">{props.name}</div>
      <div className="list">
        <ul>{getElements}</ul>
      </div>
    </div>
  );
};
