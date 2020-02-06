import React from "react";
import Modal from "../../containers/Modal/Modal";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <button className="modal-fixed-button" onClick={this.toggleModal}>
          <i className="flaticon-add"></i>
        </button>
        {showModal ? (
          <Modal>
            <h1 className="modal-head">Heading</h1>
            <p>Lorem ipsum </p>
            <button className="modal-close" onClick={this.toggleModal}>
              <i className="flaticon-add"></i>
            </button>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}
