import React, {Component} from "react";

class Contact extends Component {
  render() {
    const { showContactsEmail, arrowRotated, toggleContactsEmail } = this.props;

    return (
      <div className="contacts-container">
        <div
          className={`contacts-text ${showContactsEmail ? "active" : ""}`}
          onClick={toggleContactsEmail}
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
    );
  }
}

export default Contact;
