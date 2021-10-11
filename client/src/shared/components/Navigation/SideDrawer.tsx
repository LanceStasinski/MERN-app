import React from "react";
import ReactDOM  from "react-dom";

import classes from './SideDrawer.module.css';

const SideDrawer: React.FC = (props) => {
  const content = <aside className={classes['side-drawer']}>{props.children}</aside>;
  const drawerHook = document.getElementById('drawer-hook') as HTMLElement;
  return (
    ReactDOM.createPortal(content, drawerHook)
  );
}

export default SideDrawer;