import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addFavourite, deleteFavourite } from "../../../redux/actions/room";
import { switchElementList } from "../../../redux/actions/sidebar";

const ConversationHeader = props => {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room.data);

  const handleFavourites = () => {
    axios.get(`/rooms/favourites/${room._id}`).then(response => {
      if (response.data.type === "delete") {
        dispatch(
          switchElementList({
            room: room._id,
            dest: room.group ? "groups" : "peoples"
          })
        );
        dispatch(deleteFavourite(response.data.room));
      } else {
        dispatch(
          switchElementList({
            room: room._id,
            dest: "favourites"
          })
        );
        dispatch(addFavourite(response.data.room));
      }
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

export default ConversationHeader;
