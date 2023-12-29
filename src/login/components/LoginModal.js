import React, { Component } from "react";
import Modal from 'react-modal';
import "../css/loginModal.css"; // Создайте файл стилей для окна модального ввода

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClosing: false,
    };
  }

  closeModal = () => {
    this.setState({ isClosing: true });
    setTimeout(() => {
      this.props.closeModal();
      this.setState({ isClosing: false });
    }, 500); // Задержка должна соответствовать времени анимации закрытия (в миллисекундах)
  };
  
  render() {
    const { showModal } = this.props;
    const { isClosing } = this.state;

    return (
      <Modal
        isOpen={showModal}
        onRequestClose={this.closeModal}
        className={`modal-content ${isClosing ? 'ReactModal__Content--before-close' : ''}`}
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
