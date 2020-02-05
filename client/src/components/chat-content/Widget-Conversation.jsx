import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addFavourite, deleteFavourite } from "../../redux/actions/room";

import ConversationList from "./Conversation-List";

const WidgetConversation = props => {
  const { dispatch, room } = props;
  const users = room.users_info;
  const contentRef = useRef();

  useEffect(() => {
    const lastChild = contentRef.current.lastChild;
    if (lastChild)
      lastChild.scrollIntoView({
        behavior: "smooth"
      });
  }, [room.messages]);

  const handleFavourites = () => {
    axios.get(`/rooms/favourites/${room._id}`).then(response => {
      console.log(response.data);
      if (response.data.type === "delete")
        dispatch(deleteFavourite(response.data.room));
      else dispatch(addFavourite(response.data.room));
    });
  };

  return (
    <div className="Widget-Conversation">
      {/* Conversation Options (filters, favourites, manage) */}
      <div className="conversation-options">
        <div className="btn filter">
          <i className="flaticon-filter"></i>
          Filter
        </div>

        <div className="search-message">
          <span className="btn search-button">Search:</span>
          <input type="text" />
        </div>

        <div className="right-options">
          <i
            className={`favorites flaticon-star ${
              room.favourite ? "active" : ""
            }`}
            onClick={handleFavourites}
          ></i>
          <div className="more-options">
            <i className="flaticon-menu"></i>
          </div>
        </div>
      </div>

      {/* Conversation Informations (speakers, owner, name, description) */}
      <div className="conversation-informations">
        <p className="name">{users[0].info.name}</p>
        <p className="description">{users[0].info.bio}</p>
      </div>

      {/* Lists messages + Lists files uploaded */}
      <div className="conversation-content">
        <div className="messages">
          <ul ref={contentRef}>
            {room.messages.map(msg => (
              <ConversationList message={msg} />
            ))}
          </ul>
        </div>

        {room.files.length > 0 && (
          <div className="files">
            <ul>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
              <li>
                <img src="https://picsum.photos/200" alt="" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(state => ({
  room: state.room.data
}))(WidgetConversation);
