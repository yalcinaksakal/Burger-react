import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import styles from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary";


const sideDrawer = props => {
  const attachedClasses = [styles.SideDrawer];
  props.open
    ? attachedClasses.push(styles.Open)
    : attachedClasses.push(styles.Close);
  console.log(attachedClasses);
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
