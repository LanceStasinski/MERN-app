import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

const SideDrawer: React.FC<{show: boolean, onClick: () => void}> = (props) => {
  const nodeRef = React.useRef(null)
  const content = (
    <CSSTransition

      in={props.show}
      timeout={200}
      classNames={"slide-in-left"}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef} //remove strict mode warning
    >
      <aside ref={nodeRef} className={classes["side-drawer"]} onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
  const drawerHook = document.getElementById("drawer-hook") as HTMLElement;
  return ReactDOM.createPortal(content, drawerHook);
};

export default SideDrawer;
