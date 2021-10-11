import React from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation: React.FC = () => {
  return (
    <MainHeader>
      <button className={classes["main-navigation__menu-btn"]}>
        <span />
        <span />
        <span />
      </button>
      <h1 className={classes["main-navigation__title"]}>
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav><NavLinks /></nav>
    </MainHeader>
  );
};

export default MainNavigation;
