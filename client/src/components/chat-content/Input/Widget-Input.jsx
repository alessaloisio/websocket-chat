import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendMessageComplete } from "../../../redux/actions/message";

import "./Widget-Input.scss";

export default () => {
  const room = useSelector(state => state.room.data);
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [input, setInput] = useState("");

  // TODO: get input from localStorage

  const handleInputChange = e => {
    setInput(e.target.value);
    // TODO: save on localStorage
  };

  const handleInputKeyPress = e => {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Enter") {
      setInput(state => state + "\n");
    }
  };

  const handleSend = () => {
    const data = {};
    data.content = input;
    data.room = room._id;

    dispatch(sendMessageComplete(data));

    setInput("");
  };

  // Resize the textarea when input value change
  useEffect(() => {
    const el = inputRef.current;
    setTimeout(() => {
      el.style.cssText = "height:auto; padding:4px 1em";
      el.style.cssText = `height: ${el.scrollHeight}px`;
    }, 0);
  }, [input]);

  return (
    <div className="Widget-Input">
      <div className="emoji">
        <i className="flaticon-smile"></i>
      </div>
      <textarea
        className="input-message"
        rows="1"
        placeholder="Type a message"
        ref={inputRef}
        onChange={e => handleInputChange(e)}
        onKeyPress={e => handleInputKeyPress(e)}
        value={input}
      ></textarea>
      <div className="input-options">
        <i className="attach flaticon-attach"></i>
        <i className="send flaticon-paper-plane" onClick={handleSend}></i>
      </div>
    </div>
  );
};
