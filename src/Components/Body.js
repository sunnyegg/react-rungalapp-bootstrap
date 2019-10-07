import React, { Component } from "react";

import cartIcon from "../Assets/Icon/cartIcon.svg";
import deleteIcon from "../Assets/Icon/delete.svg";
import editIcon from "../Assets/Icon/edit.svg";

export default class Body extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="row">
        {this.props.data.map((item, index) => {
          return (
            <div className="col-sm-4 mb-3">
              <div
                className="card"
                style={{ width: "auto", marginTop: 20 }}
                key={index}
              >
                <img
                  src={`http://localhost:3333/${item.image}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="row">
                    <div className="col-sm-6">
                      <p>Rp. {item.price}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <button
                        className="btn btn-primary"
                        style={{ borderRadius: 0 }}
                        onClick={data => this.props.addCart(item)}
                      >
                        <img src={cartIcon} />
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        className="btn btn-danger"
                        style={{ borderRadius: 0 }}
                        onClick={data =>
                          this.props.deleteProduct(item, item.id)
                        }
                      >
                        <img src={deleteIcon} />
                      </button>
                    </div>
                    <div className="col-sm-3 ml-4">
                      <button
                        className="btn btn-warning"
                        style={{ borderRadius: 0 }}
                        onClick={data =>
                          this.props.editModalToggle(item, item.id)
                        }
                      >
                        <img src={editIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
