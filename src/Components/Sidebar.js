import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import addIcon from "../Assets/Icon/add.svg";
import homeIcon from "../Assets/Icon/home.svg";
import chartIcon from "../Assets/Icon/chart.svg";

export default class Sidebar extends Component {
  constructor(props) {
    super();
  }

  addProduct(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    Axios.post("http://100.24.15.0:3000/api/v1/products", data);

    setTimeout(window.location.reload(), 1000);
  }

  render() {
    return (
      <div
        className="col-sm-1 border-right"
        style={{
          backgroundColor: "#f8f9fa"
        }}
      >
        <Row>
          <Button className="mt-3 ml-3" color="#f8f9fa">
            <img style={{ width: "38px", height: "38" }} src={homeIcon} />
          </Button>
        </Row>
        <Row>
          <Link to="/revenue">
            <Button className="mt-3 ml-3" color="#f8f9fa">
              <img style={{ width: "38px", height: "38px" }} src={chartIcon} />
            </Button>
          </Link>
        </Row>
        <Row>
          <Button
            className="mt-5 ml-3"
            color="#f8f9fa"
            onClick={this.props.addModalToggle}
          >
            <img style={{ width: "38px", height: "38px" }} src={addIcon} />
          </Button>
        </Row>

        <Modal isOpen={this.props.addModal} toggle={this.props.addModalToggle}>
          <ModalHeader toggle={this.props.addModalToggle}>
            <Container>
              <Row>
                <Col>
                  <h5>Add Product</h5>
                </Col>
              </Row>
            </Container>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addProduct}>
              <FormGroup>
                <Label>Product Name</Label>
                <Input type="text" name="name" />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="description" />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input type="file" name="image" />
                <FormText color="muted"></FormText>
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <Input type="select" name="category">
                  <option value="1">Food</option>
                  <option value="2">Beverages</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Price</Label>
                <Input type="number" name="price" />
              </FormGroup>
              <FormGroup>
                <Label>Quantity</Label>
                <Input type="number" name="quantity" />
              </FormGroup>
              <Button color="primary">Add</Button>{" "}
              <Button color="danger" onClick={this.props.addModalToggle}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}
