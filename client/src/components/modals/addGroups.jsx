import React, { useState } from "react";
import Modal from "../../containers/Modal/Modal";

const AddGroups = props => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <React.Fragment>
      <button className="modal-fixed-button" onClick={toggleModal}>
        <i className="flaticon-add"></i>
      </button>
      {showModal ? (
        <Modal>
          <button className="modal-close" onClick={toggleModal}>
            <i className="flaticon-add"></i>
          </button>

          <h1 className="modal-head">Create a new group</h1>

          <div className="input">
            <label for="name">Name:</label>
            <input type="text" id="name" />
          </div>

          <div className="input">
            <label for="bio">Description:</label>
            <input type="text" id="bio" />
          </div>

          <div className="input">
            <label for="avatar">Avatar:</label>
            <input type="text" id="avatar" />
          </div>

          <button className="btn">Save</button>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default AddGroups;
