import React from "react";
import styles from "./Order.module.css";
import Button from "../UI/Button/Button";

const order = props => {
  let ingText = "";
  for (let ing in props.ingredients)
    ingText += `${ing[0].toUpperCase() + ing.slice(1)} (${
      props.ingredients[ing]
    }), `;
  ingText = ingText.slice(0, -2);

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingText} </p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
      <Button btnType="Danger" clicked={() => props.deleter(props.id)}>
        Delete
      </Button>
    </div>
  );
};

export default order;
