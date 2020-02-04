import React from "react";
import { connect } from "react-redux";

const WidgetInput = props => {
  return (
    <div className="Widget-Input">
      <div className="emoji">
        <i className="flaticon-smile"></i>
      </div>
      <textarea
        className="input-message"
        rows="1"
        placeholder="Type a message"
      ></textarea>
      <div className="input-options">
        <i className="attach flaticon-attach"></i>
        <i className="send flaticon-paper-plane"></i>
      </div>
    </div>
  );
};

export default connect(state => ({
  room: state.room.data
}))(WidgetInput);
