import React from "react";
import "../App.css";

const Login = ({ loginHandler, switchToSignUp }) => {
  return (
    <div className="loginMainDiv">
      <div className="card z-depth-5">
        <div className="card-content blue darken-2 white-text">
          <p className="flow-text center-align">Log In</p>
        </div>
        <div className="card-content">
          <div id="login">
            <div className="row">
              <form onSubmit={loginHandler} className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="loginEmail" type="email" name="emailVal" />
                    <label htmlFor="loginEmail">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" type="password" name="passVal" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn waves-effect waves-light pink right"
                >
                  Log In
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <p className="center-align">
              Dont have an account?{" "}
              <button
                onClick={switchToSignUp}
                className="transparent-btn blue-text"
              >
                SignUp
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
