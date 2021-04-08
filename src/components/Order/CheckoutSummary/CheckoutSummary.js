import React from "react";

import styles from "./CheckoutSummary.module.css";

import Burger from "../../Burger/Burger";

import Button from "../../UI/Button/Button";

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <p>
        {props.text} <br />
        We hope it tastes well. <br />
        <strong>{props.price}</strong>
      </p>
      <Button clicked={props.checkoutCancelled} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        Continue
      </Button>
      <Burger ingredients={props.ingredients} />
    </div>
  );
};

export default checkoutSummary;
