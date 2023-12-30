import React from "react"
import "../css/loginContainer.css"; 

class LoginContainer extends React.Component {
  render() {
    return (
      <div className="modal-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div>
          <label for="email"></label>
          <input type="email" placeholder="Email" 
            required/>
        </div>   
        <div>
          <label for="password"></label>
          <input type="password" placeholder="Password"
            required/>
        </div>
        <button class="btn btn--form" type="submit">Login</button>
      </form>
    </div>
    );
  }
}

export default LoginContainer