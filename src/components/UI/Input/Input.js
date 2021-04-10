import styles from "./Input.module.css";

import React from "react";
const input = props => {
  let inputEl = null;
  const inputClasses = [styles.InputEl];
  if (props.invalid && props.shouldValidate && props.touched)
    inputClasses.push(styles.Invalid);
  let label = props.label;
  if (label === "deliveryMethod") label = "Delivery";
  if (label === "zipCode") label = "Zip Code";
  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          autoFocus={props.focus}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{label}</label>
      {inputEl}
    </div>
  );
};
export default input;
