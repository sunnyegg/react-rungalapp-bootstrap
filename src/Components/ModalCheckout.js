import React, { Component } from "react";

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

export default class ModalCheckout extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          <Container>
            <Row>
              <Col xs="6">
                <h5>Checkout</h5>
              </Col>
            </Row>
          </Container>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>Name</Col>
              <Col>Quantity</Col>
              <Col>Price</Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>
            Print
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Send E-Mail
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
