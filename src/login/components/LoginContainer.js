import React from "react";
import "../css/loginContainer.css";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFocused: false,
      passwordFocused: false,
      emailValid: true,
      passwordValid: true,
      emailValue: "",
      passwordValue: "",
      emailVisited: false,
    };

    this.handleEmailFocus = this.handleEmailFocus.bind(this);
    this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailFocus = () => {
    this.setState({ emailFocused: true });
  };

  handlePasswordFocus = () => {
    this.setState({ passwordFocused: true });
  };

  handleEmailBlur = () => {
    const { emailValue } = this.state;
    this.setState((prevState) => ({
      emailFocused: false,
      emailVisited: true,
      emailValid:
        emailValue.trim() !== "" ? prevState.emailValid : false,
    }));
  };
  handlePasswordBlur = () => {
    const { passwordValue } = this.state;
    this.setState((prevState) => ({
      passwordFocused: false,
      passwordVisited: true,
      passwordValid:
        passwordValue.trim() !== "" ? prevState.passwordValid : false,
    }));
  };
  
  handlePasswordChange = (e) => {
    const { value } = e.target;
    this.setState({
      passwordValue: value,
      passwordValid: value.trim() !== "",
    });
  };

  handleEmailChange = (e) => {
    const { value } = e.target;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = value.trim() === "" || emailRegex.test(value);
  
    this.setState({
      emailValue: value,
      emailValid: isValid,
      emailVisited: true,
    });
  };

 
  handleSubmit = (event) => {
    event.preventDefault();
  
    const { emailValue, passwordValue } = this.state;
  
    // Check if fields are empty
    const emailEmpty = emailValue.trim() === "";
    const passwordEmpty = passwordValue.trim() === "";
  
    // Check for invalid email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInvalidFormat = !emailRegex.test(emailValue);
  
    // Update state to show invalid fields if they are empty or have invalid format
    this.setState({
      emailVisited: true,
      passwordVisited: true,
      emailValid: !emailEmpty && !emailInvalidFormat,
      passwordValid: !passwordEmpty,
    });
  
    // Your login logic here
  }

  render() {
    const {
      emailFocused,
      passwordFocused,
      emailValid,
      emailVisited,
      emailValue,
      passwordVisited,
      passwordValid,
      passwordValue,
    } = this.state;

    return (
      <div className="modal-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              className={`${!emailValid && emailVisited ? "invalid" : ""}`}
              onFocus={this.handleEmailFocus}
              onBlur={this.handleEmailBlur}
              onChange={this.handleEmailChange}
            />
            {!emailValid && emailVisited && !emailFocused && (
              <p className="validation-message">
                {emailVisited && !emailValid && emailValue.trim() === ""
                  ? "Required field"
                  : "Invalid email format"}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Password"
              className={`${!passwordValid && passwordVisited ? "invalid" : ""}`}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
              onChange={this.handlePasswordChange}
            />
            {!passwordValid && passwordVisited && !passwordFocused && (
              <p className="validation-message">
                {passwordVisited && !passwordValid && passwordValue.trim() === ""
                  ? "Required field"
                  : ""}
              </p>
            )}
          </div>
          <button className="btn btn--form" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
