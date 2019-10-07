import React, { Component } from "react";

export default class AddCart extends Component {
  constructor(props) {
    super();
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
}
