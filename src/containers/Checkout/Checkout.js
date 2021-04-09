import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import ContactData from "./ContactData/ContactData";

import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
    showContinue: true,
    showCancel: true,
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
        price = param[1];
      }
    }
    orderText = "Burger with " + orderText;

    this.setState({ ingredients: ingredients, text: orderText, price: price });
  }
  hideCancelHandler = () => {
    this.setState({ showCancel: false });
  };

  checkoutCancelledHandler = () => {
    this.setState({ showContinue: true });
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.setState({ showContinue: false });
    this.props.history.push({
      pathname: "/checkout/contact-data",
    });
    // this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              hideCancel={this.hideCancelHandler}
              price={this.state.price}
              {...props}
            />
          )}
          //   component={ContactData}
        />
        <CheckoutSummary
          text={this.state.text}
          price={"Price is " + this.state.price + " USD."}
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          showContinue={this.state.showContinue}
          showCancel={this.state.showCancel}
        />
      </div>
    );
  }
}

export default Checkout;
