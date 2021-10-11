import React from "react";

import classes from './SideDrawer.module.css';

const SideDrawer: React.FC = (props) => {
  return (
    <aside className={classes['side-drawer']}>{props.children}</aside>
  )
}

export default SideDrawer;