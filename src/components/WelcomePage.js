import React, { Component } from "react";
import "../css/welcomePage.css";
import "../css/loginBox.css";
import Track from "./Track";
import HeaderString from "./HeaderString";
import LoginModal from "./LoginModal";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showContactsEmail: false,
      arrowRotated: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleContactsEmail = this.toggleContactsEmail.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    const contactsContainer = document.querySelector(".contacts-container");
    if (
      contactsContainer &&
      !contactsContainer.contains(event.target) &&
      this.state.showContactsEmail
    ) {
      this.setState({ showContactsEmail: false, arrowRotated: false });
    }
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  toggleContactsEmail() {
    this.setState((prevState) => ({
      showContactsEmail: !prevState.showContactsEmail,
      arrowRotated: !prevState.arrowRotated,
    }));
  }

  render() {
    const { showModal, showContactsEmail, arrowRotated } = this.state;

    return (
      <div className="fullscreen-bg">
        <Track />
        <HeaderString />
        <div className="button-container">
          <button onClick={this.openModal} className="login-button">
            Войти
          </button>
          <button className="registration-button">Регистрация</button>
        </div>
        <div className="contacts-container">
          <div
            className={`contacts-text ${showContactsEmail ? "active" : ""}`}
            onClick={this.toggleContactsEmail}
          >
            Контакты
            <div
              className={`contacts-arrow ${
                arrowRotated ? "rotate" : ""
              }`}
            ></div>
          </div>
          <div
            className={`contacts-email ${
              showContactsEmail ? "active" : ""
            }`}
          >
            admin@example.com
          </div>
        </div>
        <LoginModal showModal={showModal} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default WelcomePage;