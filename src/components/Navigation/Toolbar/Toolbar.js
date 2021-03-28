import React from "react";
import Logo from "../../Logo/Logo";
import styles from "./Toolbar.module.css";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <Logo />
    <div>Menu</div>

    <nav>...</nav>
  </header>
);

export default toolbar;
