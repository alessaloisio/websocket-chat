import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./Modal.scss";

const modalRoot = document.getElementById("modal");

const Modal = props => {
  const element = document.createElement("div");
  element.classList.add("modal-container");

  useEffect(() => {
    modalRoot.appendChild(element);
    modalRoot.classList.add("active");
    return () => {
      modalRoot.removeChild(element);
      modalRoot.classList.remove("active");
    };
  }, []);

  return createPortal(props.children, element);
};

export default Modal;
