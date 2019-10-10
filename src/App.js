import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./Redux/store";

import Home from "./Screens/Home";
import Login from "./Components/Login";
import Revenue from "./Screens/Chart";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path={"/home"} component={Home} />
          <Route path={"/"} exact component={Login} />
          <Route path={"/revenue"} exact component={Revenue} />
        </Router>
      </Provider>
    );
  }
}
