import React, { Component } from "react";
import Modal from 'react-modal';
import "../css/loginModal.css"; // Создайте файл стилей для окна модального ввода

class LoginModal extends React.Component {
  
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input type="email" />
          <label>Password:</label>
          <input type="password" />
          <button type="submit">Login</button>
        </form>
      </Modal>
    );
  }
}


export default LoginModal;
