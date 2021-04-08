import React from "react";

import styles from "./CheckoutSummary.module.css";

import Burger from "../../Burger/Burger";

import Button from "../../UI/Button/Button";

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well.</h1>
      <div >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancelled} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
