import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";

import Spinner from "../../../components/UI/Spinner/Spinner";

import Input from "../../../components/UI/Input/Input";

const baseURL = "https://burger-react-d5fe4-default-rtdb.firebaseio.com/";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  inputChangedHandler = (e, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormelement = { ...updatedOrderForm[inputId] };
    updatedFormelement.value = e.target.value;
    updatedOrderForm[inputId] = updatedFormelement;
    this.setState({ orderForm: updatedOrderForm });
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
        this.props.hideCancel();
        setTimeout(() => this.props.history.push("/"), 3000);
      })
      .catch(error => {
        error.message = "While uploading order - " + error.message;
        this.setState({ loading: false, error: error });
      });
  };
  render() {
    let form = (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          {Object.keys(this.state.orderForm).map(formElement => (
            <Input
              key={formElement}
              focus={formElement === "name"}
              elementType={this.state.orderForm[formElement].elementType}
              elementConfig={this.state.orderForm[formElement].elementConfig}
              value={this.state.orderForm[formElement].value}
              changed={e => this.inputChangedHandler(e, formElement)}
            />
          ))}

          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
    if (this.state.loading)
      form = (
        <div className={styles.ContactData}>
          <Spinner />
        </div>
      );
    if (this.state.error)
      form = (
        <p
          className={styles.ContactData}
          style={{
            background: "#40d828",
            color: "white",
          }}
        >
          {this.state.error === "success"
            ? "Order is successfully recieved."
            : `❌ Something went wrong. (${this.state.error})`}
        </p>
      );

    return form;
  }
}

export default ContactData;
