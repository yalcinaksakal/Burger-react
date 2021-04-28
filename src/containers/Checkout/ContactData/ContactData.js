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
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
          regexp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          maxLength: 5,
          regexp: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
      },
    },
    loading: false,
    formIsValid: false,
  };

  checkValidity(value, rules) {
    value = value.trim();
    let isValid = true;

    if (rules.required) isValid = value !== "" && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    if (rules.regexp)
      isValid = rules.regexp.test(value.toLowerCase()) && isValid;

    return isValid;
  }

  inputChangedHandler = (e, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormelement = { ...updatedOrderForm[inputId] };
    updatedFormelement.value = e.target.value;
    if (updatedFormelement.validation)
      updatedFormelement.valid = this.checkValidity(
        updatedFormelement.value,
        updatedFormelement.validation
      );
    updatedFormelement.touched = true;
    updatedOrderForm[inputId] = updatedFormelement;

    let formIsValid = true;
    for (let formEl in this.state.orderForm)
      if (
        updatedOrderForm[formEl].validation &&
        !updatedOrderForm[formEl].valid
      ) {
        formIsValid = false;
        break;
      }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    //in a real app price sort of important data should be calculated on server side, so that user cant manupulate them
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: {},
    };

    const orderData = {};
    for (let formEl in this.state.orderForm)
      orderData[formEl] = this.state.orderForm[formEl].value;
    order.orderData = orderData;

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
        <form onSubmit={this.orderHandler}>
          {Object.keys(this.state.orderForm).map(formElement => (
            <Input
              key={formElement}
              label={formElement}
              focus={formElement === "name"}
              elementType={this.state.orderForm[formElement].elementType}
              elementConfig={this.state.orderForm[formElement].elementConfig}
              value={this.state.orderForm[formElement].value}
              changed={e => this.inputChangedHandler(e, formElement)}
              invalid={!this.state.orderForm[formElement].valid}
              shouldValidate={this.state.orderForm[formElement].validation}
              touched={this.state.orderForm[formElement].touched}
            />
          ))}

          <Button btnType="Success" disabled={!this.state.formIsValid}>
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
