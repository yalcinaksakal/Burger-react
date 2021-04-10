import styles from "./Input.module.css";

import React from "react";
const input = props => {
  let inputEl = null;

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={styles.InputEl}
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
          className={styles.InputEl}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={styles.InputEl}
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
          className={styles.InputEl}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};
export default input;
