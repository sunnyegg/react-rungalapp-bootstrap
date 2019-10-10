import React, { Component } from "react";
import logOutIcon from "../Assets/Icon/logout.svg";

export default class Navbar extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light border">
        <div className="col-sm-3">
          <a href="/home" className="navbar-brand">
            Food Items
          </a>
        </div>

        <div className="col-sm-2">
          <form className="form-inline">
            <input
              onChange={this.props.search}
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        <div className="col-sm-1">
          <button className="btn btn-danger">
            <img src={logOutIcon} />
          </button>
        </div>
      </nav>
    );
  }
}
