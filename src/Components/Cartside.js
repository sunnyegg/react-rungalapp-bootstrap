import React, { Component } from "react";
import cartempty from "../Assets/Img/cartempty.svg";

export default class Cartside extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h5 className="mt-2 text-center">
              Cart {this.props.cartData.length}
            </h5>
            {this.props.cartData.length > 0 ? (
              this.props.cartData.map((item, key) => {
                return (
                  <div
                    className="card ml-2 mx-auto"
                    style={{ width: 200, marginTop: 10 }}
                  >
                    <img
                      src={`http://localhost:3333/${item.image}`}
                      className="card-img-top"
                      alt={item.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>Rp. {item.price}</p>

                      <div className="col-sm-12 text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              this.props.reduceQty(key);
                            }}
                          >
                            -
                          </button>
                          <span className="btn btn-secondary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              this.props.addQty(key);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <img className="col-sm-12" src={cartempty} />
            )}
          </div>
        </div>
        <div className="row mt-5 mx-auto border-top border-bottom">
          <div className="col-sm-12 mt-3">
            <h4 className="text-center">Total: Rp. {this.props.totalPrice}*</h4>
            <p className="text-center">*Belum termasuk ppn</p>
          </div>
        </div>
        <div className="row mx-auto mt-3">
          <div className="col-sm-12">
            <button
              type="button"
              className="btn btn-primary w-100"
              style={{ borderRadius: 0 }}
              onClick={this.props.toggle}
            >
              Checkout
            </button>
          </div>
          <div className="col-sm-12 mt-2">
            <button
              type="button"
              className="btn btn-danger w-100"
              style={{ borderRadius: 0 }}
              onClick={this.props.cancelCart}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
