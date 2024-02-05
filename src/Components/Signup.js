import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import Link from react-router-dom
import "../App.css";

class Signup extends Component {
    render() {
        return (
            <div className="signupMainDiv" ref={this.props.signupCard}>
                <div className="card z-depth-5">
                    <div className="card-content blue darken-2 white-text">
                        <p className="flow-text center-align">Sign Up</p>
                    </div>
                    <div className="card-content">
                        <div id="signup">
                            <div className="row">
                                <form onSubmit={this.props.signupHandler} className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">person</i>
                                            <input
                                                ref={this.props.nameVal}
                                                id="name"
                                                type="text"
                                            />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <input
                                                ref={this.props.emailVal}
                                                id="signupEmail"
                                                type="email"
                                            />
                                            <label htmlFor="signupEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">lock</i>
                                            <input
                                                ref={this.props.passVal}
                                                id="signupPassword"
                                                type="password"
                                            />
                                            <label htmlFor="signupPassword">Password</label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn waves-effect waves-light pink right"
                                    >
                                        Sign Up
                                        <i className="material-icons right">send</i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <p className="center-align">Already have an account?   <button onClick={this.props.switchToLogin}className="transparent-btn blue-text">Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
