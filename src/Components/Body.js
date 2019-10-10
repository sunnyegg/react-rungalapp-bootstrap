import React, { Component } from "react";
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

import cartIcon from "../Assets/Icon/cartIcon.svg";
import deleteIcon from "../Assets/Icon/delete.svg";
import editIcon from "../Assets/Icon/edit.svg";

const convertRupiah = require("rupiah-format");

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      name: "",
      category: 0,
      price: 0,
      image: "",
      description: "",
      quantity: "",
      dataID: null
    };
    this.editModalToggle = this.editModalToggle.bind(this);
  }

  editModalToggle(data) {
    this.setState({
      editModal: !this.state.editModal,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      quantity: data.quantity,
      dataID: data.id
    });
  }

  editProduct = event => {
    event.preventDefault();
    const dataEdit = new FormData(event.target);
    const editID = this.state.dataID;

    Axios.put(`http://localhost:3333/api/v1/products/${editID}`, dataEdit);
  };

  handlerEdit = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="row">
        {this.props.data.map(item => {
          return (
            <div className="col-sm-4 mb-3">
              <div className="card" style={{ width: "auto", marginTop: 20 }}>
                <img
                  src={`http://localhost:3333/${item.image}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="row">
                    <div className="col-sm-7">
                      <p>{convertRupiah.convert(item.price)}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.props.addCart(item)}
                      >
                        <img src={cartIcon} />
                      </button>
                    </div>
                    <div className="col-sm-3">
                      <button
                        className="btn btn-danger"
                        onClick={() => this.props.deleteProduct(item, item.id)}
                      >
                        <img src={deleteIcon} />
                      </button>
                    </div>
                    <div className="col-sm-3 ml-4">
                      <button
                        className="btn btn-warning"
                        onClick={() => this.editModalToggle(item)}
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

        <Modal isOpen={this.state.editModal} toggle={this.editModalToggle}>
          <ModalHeader toggle={this.editModalToggle}>
            <Container>
              <Row>
                <Col>
                  <h5>Edit Product</h5>
                </Col>
              </Row>
            </Container>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.editProduct}>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handlerEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handlerEdit}
                />
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
                <Input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handlerEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handlerEdit}
                />
              </FormGroup>
              <Button color="primary">Edit</Button>{" "}
              <Button color="danger" onClick={this.editModalToggle}>
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
