import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const burger = props => {
  const transformedIngredients = [];
  Object.keys(props.ingredients).forEach(igKey =>
    [...Array(props.ingredients[igKey])].forEach((_, i) =>
      transformedIngredients.push(
        <BurgerIngredient key={igKey + i} type={igKey} />
      )
    )
  );
  if (!transformedIngredients.length)
    transformedIngredients.push(
      <p key="p">Please start adding ingredients.</p>
    );

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
