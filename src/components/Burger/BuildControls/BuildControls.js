import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const buildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      Price: <strong>{props.price.toFixed(2)}</strong>$
    </p>
    {controls.map(ctrl => (
      <BuildControl
        changed={opperation => props.ingredientChanged(ctrl.type, opperation)}
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button className={styles.OrderButton} disabled={props.price <= 4}
    onClick={props.ordered}>
      Order Now
    </button>
  </div>
);

export default buildControls;
