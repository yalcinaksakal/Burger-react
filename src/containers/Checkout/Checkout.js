import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import ContactData from "./ContactData/ContactData";

import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: {},
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let orderText = "",
      price = "";
    for (let param of query.entries()) {
      if (param[1] === "0") continue;
      if (orderText && param[0] !== "price") orderText += ", ";
      if (param[0] !== "price") {
        ingredients[param[0]] = +param[1];
        orderText += param[1] + " " + param[0];
      } else {
        orderText += ". ";
        price = "Price is " + param[1] + " USD.";
      }
    }
    orderText = "Burger with " + orderText;

    this.setState({ ingredients: ingredients, text: orderText, price: price });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
        <CheckoutSummary
          text={this.state.text}
          price={this.state.price}
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
