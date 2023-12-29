import React, { useState } from "react";
import "../css/welcomePage.css"; 
import "../css/loginBox.css";
import Track from "./Track";
import HeaderString from "./HeaderString";
import LoginModal from "./LoginModal";


class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showContacts: false,
      rotateArrow: false
    };
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  toggleContacts = () => {
    this.setState((prevState) => ({
      showContacts: !prevState.showContacts,
      rotateArrow: !prevState.rotateArrow
    }));
  };

  render() {
    const { showContacts, rotateArrow, showModal } = this.state;
    return (
      <div className="fullscreen-bg">
        <Track />
        <HeaderString />
        <div className="button-container">
          <button onClick={this.openModal} className="login-button">
            Login
          </button>
          <button className="registration-button">Registration</button>
        </div>
        <div
          className={`contacts-container ${showContacts ? 'active' : ''}`}
          onClick={this.toggleContacts} // Используйте this.toggleContacts
        >
          <div className="contacts-text">Contacts</div>
          <div className={`contacts-arrow ${rotateArrow ? 'rotate' : ''}`}></div>
          <div className="contacts-email">admin@example.com</div>
        </div>
        <LoginModal showModal={showModal} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default WelcomePage;