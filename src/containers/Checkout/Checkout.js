import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import ContactData from "./ContactData/ContactData";

import { Route } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
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
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    // this.props.history.push({
    //     pathname: "/checkout/contact-data"
    //   });
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
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
        />
      </div>
    );
  }
}

export default Checkout;
