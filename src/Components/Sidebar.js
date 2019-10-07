import React, { Component } from "react";
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

export default class Sidebar extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="col-sm-1">
        <Button
          className="mt-5"
          color="success"
          onClick={this.props.addModalToggle}
        >
          Add Product
        </Button>
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
            <Form onSubmit={this.props.addProduct}>
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
