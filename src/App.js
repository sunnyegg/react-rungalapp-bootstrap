import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home";
import Login from "./Components/Login";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path={"/home"} component={Home} />
          <Route path={"/"} exact component={Login} />
        </Router>
      </div>
    );
  }
}
