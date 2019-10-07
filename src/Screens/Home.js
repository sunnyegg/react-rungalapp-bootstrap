import React, { Fragment, Component } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Body from "../Components/Body";
import Sidebar from "../Components/Sidebar";
import Cartside from "../Components/Cartside";
import ModalCheckout from "../Components/ModalCheckout";

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

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      cart: [],
      search: "",
      sort: "name",
      order: "asc",
      page: "1",
      totalPrice: 0,
      modal: false,
      addModal: false,
      editModal: false
    };
    this.addCart = this.addCart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addModalToggle = this.addModalToggle.bind(this);
    this.editModalToggle = this.editModalToggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  addModalToggle() {
    this.setState(prevState => ({
      addModal: !prevState.addModal
    }));
  }
  editModalToggle() {
    this.setState(prevState => ({
      editModal: !prevState.editModal
    }));
  }

  async componentDidMount() {
    await this.getAll(
      this.state.search,
      this.state.sort,
      this.state.order,
      this.state.page
    );
  }

  getAll = async (search, sort, order, page) => {
    let querySearch, querySort, queryOrder, queryPage;

    if (search) querySearch = `&search=${search}`;
    else querySearch = "";

    if (sort && order) querySort = `?sort=${sort}&order=${order}`;
    else querySort = "";

    if (page) queryPage = `&page=${page}`;
    else queryPage = "";

    axios
      .get(
        `http://localhost:3333/api/v1/products${querySort}${querySearch}${queryPage}`
      )
      .then(result => {
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSearch = event => {
    event.preventDefault();
    let search = event.target.value;

    this.setState({ search });
    this.getAll(search, this.state.sort, this.state.order, this.state.page);
  };

  getSort = event => {
    event.preventDefault();
    let sort = event.target.value;

    this.setState({ sort });
    this.getAll(this.state.search, sort, this.state.order, this.state.page);
  };

  getOrder = event => {
    event.preventDefault();
    let order = event.target.value;

    this.setState({ order });
    this.getAll(this.state.search, this.state.sort, order, this.state.page);
  };
  getPage = event => {
    event.preventDefault();
    let page = event.target.value;

    this.setState({ page });
    this.getAll(this.state.search, this.state.sort, this.state.order, page);
  };

  addCart(data) {
    const { id, name, price, image, quantity } = data;
    let cart = { id, name, price, image, quantity: 1 };
    const exists = this.state.cart.find(({ id }) => id === data.id);
    if (exists) {
      window.alert("Product is already in the cart!");
    } else {
      data.quantity = 1;
      const totalPrice = this.state.totalPrice + data.price;
      const carts = [...this.state.cart, cart];
      this.setState({ cart: carts, totalPrice });
    }
  }

  addQty(data) {
    let cart = this.state.cart[data];
    let product = this.state.data.find(product => product.id == cart.id);
    cart.quantity += 1;
    cart.price += product.price;
    console.log(cart);
    const totalPrice = this.state.totalPrice + product.price;
    this.setState({ carts: [cart], totalPrice });
  }

  reduceQty(data) {
    let cart = this.state.cart[data];
    let allcart = this.state.cart;
    let product = this.state.data.find(product => product.id == cart.id);
    const totalPrice = this.state.totalPrice - product.price;
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      cart.price -= product.price;
      this.setState({
        carts: [cart],
        totalPrice
      });
    } else {
      allcart.splice(data, 1);
      this.setState({ cart: allcart, totalPrice });
    }
  }

  cancelCart() {
    this.setState(prevState => ({
      cart: [],
      totalPrice: 0
    }));
  }

  addProduct(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:3333/api/v1/products", {
      method: "POST",
      body: data
    });

    window.location.reload();
  }

  deleteProduct(data, id) {
    if (window.confirm("Are you sure want to delete this product?")) {
      fetch("http://localhost:3333/api/v1/products/" + id, {
        method: "DELETE"
      });

      window.location.reload();
    }
  }

  editProduct(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:3333/api/v1/products/", {
      method: "POST",
      body: data
    });
  }

  render() {
    return (
      <Fragment>
        <Navbar
          search={val => {
            this.getSearch(val);
          }}
        />

        <div className="container-fluid" style={{ backgroundColor: "#ecf0f1" }}>
          <div className="row">
            <Sidebar
              addModalToggle={this.addModalToggle}
              addModal={this.state.addModal}
              addProduct={this.addProduct}
            />
            <div
              className="col-sm-7 border mt-3 mb-2 ml-1 mr-1"
              style={{ backgroundColor: "white" }}
            >
              <div className="row border-bottom">
                <div className="form-group col-sm-2" style={{ marginTop: 10 }}>
                  <label htmlFor="exampleFormControlSelect1">Sort By:</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.getSort}
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="category">Category</option>
                    <option value="date_updated">Date</option>
                  </select>
                </div>
                <div className="form-group col-sm-2" style={{ marginTop: 10 }}>
                  <label htmlFor="exampleFormControlSelect1">Order:</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.getOrder}
                  >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                  </select>
                </div>
                <div className="form-group col-sm" style={{ marginTop: 40 }}>
                  <nav aria-label="Page navigation example">
                    {/* {this.getPage.map((item) => {
                        return ( */}
                    <ul
                      className="pagination justify-content-end"
                      onClick={this.getPage}
                    >
                      <li className="page-item">
                        <button className="page-link" value="1">
                          1
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" value="2">
                          2
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" value="3">
                          3
                        </button>
                      </li>
                      <li className="page-item">
                        <button className="page-link" value="4">
                          4
                        </button>
                      </li>
                    </ul>
                    {/* )
                      })} */}
                  </nav>
                </div>
              </div>

              <Body
                data={this.state.data}
                addCart={this.addCart}
                deleteProduct={this.deleteProduct}
                editModalToggle={this.editModalToggle}
              />
            </div>
            <div
              className="col-sm-3 border mt-3 mb-5 ml-5"
              style={{ backgroundColor: "white" }}
            >
              <div className="container-fluid">
                <Cartside
                  cartData={this.state.cart}
                  reduceQty={data => {
                    this.reduceQty(data);
                  }}
                  addQty={data => {
                    this.addQty(data);
                  }}
                  totalPrice={this.state.totalPrice}
                  toggle={this.toggle}
                  cancelCart={data => {
                    this.cancelCart(data);
                  }}
                />
                <ModalCheckout modal={this.state.modal} toggle={this.toggle} />
                <Modal
                  isOpen={this.state.editModal}
                  toggle={this.editModalToggle}
                >
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
                      <Button color="primary">Edit</Button>{" "}
                      <Button color="danger" onClick={this.editModalToggle}>
                        Cancel
                      </Button>
                    </Form>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
