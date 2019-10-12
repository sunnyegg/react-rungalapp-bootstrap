import React, { Component } from "react";
import cartempty from "../Assets/Img/cartempty.svg";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col
} from "reactstrap";

const convertRupiah = require("rupiah-format");

export default class Cartside extends Component {
  constructor(props) {
    super();
  }

  checkoutData = () => {
    console.log(this.props.cartData);
  };

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
                      src={`http://100.24.15.0:3000/${item.image}`}
                      className="card-img-top"
                      alt={item.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>{convertRupiah.convert(item.price)}</p>

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
        <div
          className="container"
          style={{ backgroundColor: "white", position: "sticky", bottom: "0" }}
        >
          <div className="row mt-5 mx-auto border-top border-bottom">
            <div className="col-sm-12 mt-3">
              <h5 className="text-center">
                Total: {convertRupiah.convert(this.props.totalPrice)}*
              </h5>
              <p className="text-center">*Belum termasuk ppn</p>
            </div>
          </div>
          <div className="row mx-auto mt-3">
            <div className="col-sm-12">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={this.props.toggle}
              >
                Checkout
              </button>
            </div>
            <div className="col-sm-12 mt-2 mb-3">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={this.props.cancelCart}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader
            toggle={this.props.toggle}
            style={{ borderBottom: "white" }}
          >
            <Row>
              <Col>
                <h4>Checkout</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="">Receipt no: #12317df</h6>
              </Col>
            </Row>
          </ModalHeader>

          <ModalBody>
            <Container>
              <Row>
                <Col>
                  <p>Cashier: Adila</p>
                </Col>
              </Row>
              <Row></Row>
              <Row className="border">
                <Col>
                  <em>
                    <b>Product Name:</b>
                  </em>
                </Col>
                <Col>
                  <em>
                    <b>Quantity:</b>
                  </em>
                </Col>
                <Col>
                  <em>
                    <b>Price:</b>
                  </em>
                </Col>
              </Row>
              {this.props.cartData.map(item => {
                return (
                  <Row className="border-left border-right border-bottom">
                    <Col>{item.name}</Col>
                    <Col>{item.quantity}x</Col>
                    <Col>{convertRupiah.convert(item.price)}</Col>
                  </Row>
                );
              })}
            </Container>
            <Container>
              <Row className="border-left border-right border-bottom">
                <Col>Total:</Col>
                <Col></Col>
                <Col>{convertRupiah.convert(this.props.totalPrice)}</Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.checkoutData()}>
              Print
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Send E-Mail
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
