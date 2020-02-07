import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addFavourite, deleteFavourite } from "../../redux/actions/room";

const ConversationHeader = props => {
  const { dispatch, room } = props;

  const handleFavourites = () => {
    axios.get(`/rooms/favourites/${room._id}`).then(response => {
      if (response.data.type === "delete")
        dispatch(deleteFavourite(response.data.room));
      else dispatch(addFavourite(response.data.room));
    });
  };
  return (
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
  );
};

export default connect(state => ({
  room: state.room.data
}))(ConversationHeader);
