import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  submitLogin(event) {
    event.preventDefault();
    fetch("http://localhost:3333:/api/v1/products/login", {
      method: "POST",
      user: this.state.user,
      password: this.state.password
    });
  }

  // onChangeLogin(e) {
  // 	this.setState({ [e.target.value]: e.target.value })
  // }

  render() {
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form
                  id="login-form"
                  className="form"
                  onSubmit={this.submitLogin}
                >
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="user"
                      id="username"
                      className="form-control"
                      // value={this.state.user}
                      // onChange={this.onChangeLogin}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      // value={this.state.password}
                      // onChange={this.onChangeLogin}
                    />
                  </div>
                  <div className="form-group">
                    <Link to={"/home"}>
                      <button className="btn btn-primary">Submit</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
