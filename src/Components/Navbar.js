import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand ml-5">Food Items</a>
        <form className="form-inline" style={{ marginRight: 405 }}>
          <input
            onChange={this.props.search}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </nav>
    );
  }
}
