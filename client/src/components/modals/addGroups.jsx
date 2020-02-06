import React, { useState } from "react";
import { connect } from "react-redux";

import { toggleModal } from "../../redux/actions/modal";

import Modal from "../../containers/Modal/Modal";

const AddGroups = props => {
  const { showModal, dispatch } = props;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <React.Fragment>
      <button className="modal-fixed-button" onClick={handleModal}>
        <i className="flaticon-add"></i>
      </button>
      {showModal ? (
        <Modal>
          <button className="modal-close" onClick={handleModal}>
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

          <button className="btn-primary">Save</button>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default connect(state => ({
  showModal: state.modal.showModal
}))(AddGroups);
