import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sendMessageComplete } from "../../../redux/actions/message";

import "./Widget-Input.scss";

const WidgetInput = () => {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room.data);

  const inputRef = useRef();
  const [input, setInput] = useState("");

  // Get input from localStorage OR
  // When change room reset input
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages")) || {};
    if (messages[room._id]) {
      setInput(messages[room._id]);
    } else setInput("");
  }, [room]);

  const handleInputChange = e => {
    setInput(e.targetvalue);
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

  useEffect(() => {
    // Resize the textarea when input value change
    const el = inputRef.current;
    setTimeout(() => {
      el.style.cssText = "height:auto; padding:4px 1em";
      el.style.cssText = `height: ${el.scrollHeight}px`;
    }, 0);

    // Save on localStorage
    const messages = JSON.parse(localStorage.getItem("messages")) || {};

    if (input.length > 0) messages[room._id] = input;
    else delete messages[room._id];

    localStorage.setItem(
      "messages",
      JSON.stringify({
        ...messages
      })
    );
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

export default WidgetInput;
