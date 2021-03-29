import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import styles from "./Toolbar.module.css";
import ToggledDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <Logo />
    <ToggledDrawer clicked={props.toggleDrawer} />
    <nav className={styles.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
