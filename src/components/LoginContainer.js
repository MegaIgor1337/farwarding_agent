import React from "react";
import "../css/loginContainer.css";
import { request, setAuthToken } from "../util/axios_helper";
import ErrorPage from "../pages/ErrorPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


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
      errorMessage: "",
      redirectToErrorPage: false, 
    };

    this.handleEmailFocus = this.handleEmailFocus.bind(this);
    this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailFocus = () => {
    this.setState(() => ({
      emailFocused: true, 
      errorMessage: ""}));
  };

  handlePasswordFocus = () => {
    this.setState(() => ({
      passwordFocused: true, 
      errorMessage: ""}));
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
  
    const {emailValid, passwordValid, emailValue, passwordValue } = this.state;
  
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
  
    if (emailValid && passwordValid) {
      request("POST",
      "/api/v1/auth/login",
      {
        email: emailValue,
        password: passwordValue
      }).then((response) => {
        setAuthToken(response.data.token);
        
      }).catch((error) => {
        console.log(error)
        if (error.response) {
          console.log("I am here")
          if (error.response.status === 400) {
            this.setState({ errorMessage: "Неверная электронная почта или пароль" });
          }
        } else if (error.message === "Network Error") {
          <Route
                        exact
                        path="/error"
                        element={<ErrorPage />}
                    />
        } 
      })
    }
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
      errorMessage,
    } = this.state;

    const isEmailInvalid = !emailValid && emailVisited && !emailFocused;
    const isPasswordInvalid = !passwordValid && passwordVisited && !passwordFocused;
  

    return (
      <div className="modal-container">
        <h2 className="login-title">Вход</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <input
              placeholder="Эл. почта"
              className={`${isEmailInvalid ? "invalid" : ""}`}
              onFocus={this.handleEmailFocus}
              onBlur={this.handleEmailBlur}
              onChange={this.handleEmailChange}
            />
            {isEmailInvalid && (
              <p className="validation-message">
                {emailVisited && !emailValid && emailValue.trim() === ""
                  ? "Обязательное поле"
                  : "Неверный формат почты"}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Пароль"
              className={`${isPasswordInvalid ? "invalid" : ""}`}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
              onChange={this.handlePasswordChange}
            />
            {!passwordValid && passwordVisited && !passwordFocused && (
              <p className="validation-message">
                {isPasswordInvalid && passwordValue.trim() === ""
                  ? "Обязательное поле"
                  : ""}
              </p>
            )}
          </div>

          <div className="error-message">
            {errorMessage}
          </div>
          <button className="btn btn--form" type="submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
