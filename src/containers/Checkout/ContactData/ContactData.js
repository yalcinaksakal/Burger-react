import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";

import Spinner from "../../../components/UI/Spinner/Spinner";

const baseURL = "https://burger-react-d5fe4-default-rtdb.firebaseio.com/";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    //in a real app price sort of important data should be calculated on server side, so that user cant manupulate them
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "YA",
        adress: { street: "adress", zipCode: "1234", country: "Germany" },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    fetch(baseURL + "/orders.json", {
      method: "POST",
      body: JSON.stringify(order),
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        this.setState({ loading: false, error: "success" });
        setTimeout(() => this.props.history.push("/"), 2000);
      })
      .catch(error => {
        error.message = "While uploading order - " + error.message;
        this.setState({ loading: false, error: error });
      });
  };
  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="text"
          name="email"
          placeholder="Your email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    if (this.state.error)
      form =
        this.state.error === "success" ? (
          <p style={{ background: "#40d828", color: "white", padding: "10px" }}>
            Order is successfully recieved.
          </p>
        ) : (
          <p> {`❌ Something went wrong. (${this.state.error})`}</p>
        );
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
