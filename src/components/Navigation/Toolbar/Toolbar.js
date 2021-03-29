import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import styles from "./Toolbar.module.css";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <Logo />
    <div>Menu</div>
    <nav className={styles.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
