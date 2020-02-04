import React, { useState } from "react";
import { connect } from "react-redux";

import { sendMessageComplete } from "../../redux/actions/message";

const WidgetInput = props => {
  const [input, setInput] = useState("");

  // TODO: get input from localStorage

  const handleInput = e => {
    setInput(e);
    // TODO: save on localStorage
  };

  const handleSend = () => {
    const data = {};
    data.content = input;
    data.room = props.room._id;

    props.dispatch(sendMessageComplete(data));

    setInput("");
  };

  return (
    <div className="Widget-Input">
      <div className="emoji">
        <i className="flaticon-smile"></i>
      </div>
      <textarea
        className="input-message"
        rows="1"
        placeholder="Type a message"
        onChange={e => handleInput(e.target.value)}
        value={input}
      ></textarea>
      <div className="input-options">
        <i className="attach flaticon-attach"></i>
        <i className="send flaticon-paper-plane" onClick={handleSend}></i>
      </div>
    </div>
  );
};

export default connect(state => ({
  room: state.room.data
}))(WidgetInput);
