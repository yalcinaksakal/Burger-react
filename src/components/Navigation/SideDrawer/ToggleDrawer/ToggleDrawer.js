import React from "react";
import styles from "./ToggleDrawer.module.css";

const toggleDrawer = props => (
  <div onClick={props.clicked} className={styles.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggleDrawer;
