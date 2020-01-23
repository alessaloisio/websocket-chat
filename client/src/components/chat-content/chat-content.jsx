import React from "react";

export default () => {
  return (
    <div className="Chat-Content">
      {/* Conversation Options (filters, favourites, manage) */}
      <div className="conversation-options">
        <span className="filter">
          <i className="flaticon-filter"></i>
          Filter
        </span>

        <div className="search-message">
          <span className="search-button">Search</span>
          <div className="search-input">
            <input type="text" />
          </div>
        </div>

        <div className="right-options">
          <i className="flaticon-star"></i>
          <div className="more-options">
            <i className="flaticon-menu"></i>
          </div>
        </div>
      </div>
      {/* Conversation Informations (speakers, owner, name, description) */}
      {/* Lists messages + Lists files uploaded */}
      {/* Message Input + emoticon + send a file */}
    </div>
  );
};
