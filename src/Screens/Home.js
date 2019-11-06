import React, { Fragment, Component } from "react";
import axios from "axios";
import ls from "local-storage";

import { connect } from "react-redux";
import { getHome } from "../Redux/Actions/Home";

import Navbar from "../Components/Navbar";
import Body from "../Components/Body";
import Sidebar from "../Components/Sidebar";
import Cartside from "../Components/Cartside";

class Home extends Component {
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
      orderName: "",
      orderPrice: 0,
      orderQuantity: 0
    };
    this.addCart = this.addCart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addModalToggle = this.addModalToggle.bind(this);
  }

  async componentDidMount() {
    await this.getAll(
      this.state.search,
      this.state.sort,
      this.state.order,
      this.state.page
    );
    console.log(ls.get("token"));
  }

  getAll = async () => {
    const result = await this.props.dispatch(
      getHome({
        search: this.state.search,
        sort: this.state.sort,
        order: this.state.order,
        page: this.state.page
      })
    );

    this.setState({
      data: result.value.data.data
    });
  };

  getSearch = async event => {
    event.preventDefault();
    let search = event.target.value;
    await this.setState({ search });
    return this.getAll(
      search,
      this.state.sort,
      this.state.order,
      this.state.page
    );
  };

  getSort = async event => {
    event.preventDefault();
    let sort = event.target.value;

    await this.setState({ sort });
    return this.getAll(
      this.state.search,
      sort,
      this.state.order,
      this.state.page
    );
  };

  getOrder = async event => {
    event.preventDefault();
    let order = event.target.value;

    await this.setState({ order });
    return this.getAll(
      this.state.search,
      this.state.sort,
      order,
      this.state.page
    );
  };
  getPage = async event => {
    event.preventDefault();
    let page = event.target.value;

    await this.setState({ page });
    return this.getAll(
      this.state.search,
      this.state.sort,
      this.state.order,
      page
    );
  };

  // ADD CART

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

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
    this.setState(() => ({
      cart: [],
      totalPrice: 0
    }));
  }

  // Add Product

  addModalToggle() {
    this.setState(prevState => ({
      addModal: !prevState.addModal
    }));
  }

  // Delete Product

  deleteProduct(id) {
    console.log(`Bearer ${ls.get("token")}`);
    if (window.confirm("Are you sure want to delete this product?")) {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${ls.get("token")}`
        }
      });
      alert("Deleted");
    } else {
      alert("Cannot Delete");
    }
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
                    </ul>
                  </nav>
                </div>
              </div>
              <Body
                data={this.state.data}
                addCart={this.addCart}
                deleteProduct={this.deleteProduct}
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
                  modal={this.state.modal}
                  toggle={this.toggle}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.Home
  };
};

export default connect(mapStateToProps)(Home);
