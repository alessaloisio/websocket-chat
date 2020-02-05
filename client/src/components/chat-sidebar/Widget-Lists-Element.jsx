import React from "react";
import { connect } from "react-redux";

import { sidebarSelectRoom } from "../../redux/actions/room";

import "./Widget-Lists-Element.scss";

const WidgetListsElement = props => {
  const handleElement = id => {
    console.log(id);
    props.dispatch(sidebarSelectRoom(id));
  };

  const getElements = props.list.map(element => {
    console.log(element);
    return (
      <li key={element._id} onClick={() => handleElement(`${element._id}`)}>
        <span className="avatar">
          <img src={element.users_info[0].info.avatar} alt="User avatar" />
          {element.users_info[0].status && (
            <div className="status">
              <span className={element.users_info[0].status}></span>
            </div>
          )}
        </span>
        <span className="name">{element.users_info[0].info.name}</span>
        <span className="unread">
          <span className="number">{element.users_info[0].unread || 0}</span>
        </span>
      </li>
    );
  });

  return (
    <div className="Widget-Lists">
      <div className="title">{props.name}</div>
      <ul className="list">{getElements}</ul>
    </div>
  );
};

export default connect()(WidgetListsElement);
