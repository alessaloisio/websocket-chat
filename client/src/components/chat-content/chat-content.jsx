import React from "react";

import "./chat-content.scss";

export default () => {
  return (
    <div className="Chat-Content">
      <div className="Widget-Conversation">
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
        <div className="conversation-informations">
          <p className="name">Alessandro Aloisio</p>
          <p className="description">FullStack Web Developer</p>
        </div>

        {/* Lists messages + Lists files uploaded */}
        <div className="conversation-content">
          <div className="messages">
            <ul>
              <li className="msg blue">
                <span className="avatar">
                  <img src="https://i.pravatar.cc/64" alt="" />
                </span>
                <p className="name">Serge</p>
                <p className="datetime">3 days ago</p>
                <p className="message">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  non magnam nostrum id earum itaque minima cumque distinctio
                  iusto! Repudiandae, ullam corporis! Quibusdam impedit in
                  deleniti nobis placeat sed? Blanditiis?
                </p>
              </li>
              <li className="msg blue">
                <span className="avatar">
                  <img src="https://i.pravatar.cc/64" alt="" />
                </span>
                <p className="name">Serge</p>
                <p className="datetime">2 days ago</p>
                <p className="message">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  non magnam nostrum id earum itaque minima cumque distinctio
                  iusto! Repudiandae, ullam corporis!
                </p>
              </li>
              <li className="msg">
                <span className="avatar">
                  <img src="https://i.pravatar.cc/64" alt="" />
                </span>
                <p className="name">Alessio</p>
                <p className="datetime">now</p>
                <p className="message">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  non magnam nostrum id earum itaque minima cumque distinctio
                  iusto!
                </p>
              </li>
            </ul>
          </div>
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
        </div>
      </div>

      {/* Message Input + emoticon + send a file */}
      <div className="Widget-Input">
        <div className="emoji">
          <i className="flaticon-smile"></i>
        </div>
        <input type="text" placeholder="Type a message" />
        <i className="flaticon-attach"></i>
        <i className="flaticon-paper-plane"></i>
      </div>
    </div>
  );
};
