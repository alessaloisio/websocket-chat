import React from "react";
import { connect } from "react-redux";

import { sidebarSelectRoom } from "../../redux/actions/room";

import "./Widget-Lists-Element.scss";

const WidgetListsElement = props => {
  const handleElement = id => {
    props.dispatch(sidebarSelectRoom(id));
  };

  const getElements = props.list.map(element => {
    const personalInfo = element.group ? element.group : element.users_info[0];

    return (
      <li key={element._id} onClick={() => handleElement(`${element._id}`)}>
        <span className="avatar">
          <img src={personalInfo.info.avatar} alt="User avatar" />
          {personalInfo.status && (
            <div className="status">
              <span className={personalInfo.status}></span>
            </div>
          )}
        </span>
        <span className="name">{personalInfo.info.name}</span>
        <span className="unread">
          <span className="number">{personalInfo.unread || 0}</span>
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
