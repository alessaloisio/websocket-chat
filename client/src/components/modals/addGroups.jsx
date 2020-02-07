import React, { useState } from "react";
import { connect } from "react-redux";

import { createGroupComplete } from "../../redux/actions/groups";

import Modal from "../../containers/Modal/Modal";

const AddGroups = props => {
  const { dispatch } = props;
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const toggleModal = () => {
    // Clear
    setName("");
    setBio("");
    setAvatar("");

    setShowModal(state => !state);
  };

  const handleSave = () => {
    const data = { name, bio, avatar };

    dispatch(createGroupComplete(data));
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
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input">
            <label for="bio">Description:</label>
            <input
              type="text"
              id="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>

          <div className="input">
            <label for="avatar">Avatar:</label>
            <input
              type="text"
              id="avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default connect()(AddGroups);
