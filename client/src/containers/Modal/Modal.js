import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./Modal.scss";

const modalRoot = document.getElementById("modal");

const Modal = props => {
  useEffect(() => {
    modalRoot.classList.add("active");
    return () => {
      modalRoot.classList.remove("active");
    };
  }, []);

  return createPortal(
    <div className={`modal-container ${props.className}`}>
      {props.children}
    </div>,
    modalRoot
  );
};

export default Modal;
