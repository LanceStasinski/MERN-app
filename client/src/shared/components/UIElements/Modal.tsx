import React, { FormEvent } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";

type Props = {
  show: boolean;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: () => void;
  contentClass?: string;
  footerClass?: string;
  footer?: HTMLElement;
};

const ModalOverLay: React.FC<Props> = (props) => {
  const content = (
    <div
      className={`${classes["modal"]} ${props.className}`}
      style={props.style}
    >
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
        <form
          onSubmit={
            props.onSubmit
              ? props.onSubmit
              : (event: FormEvent) => event.preventDefault
          }
        >
          <div className={`${classes["modal__content"]} ${props.contentClass}`}>
            {props.children}
          </div>
          <footer
            className={`${classes["modal__footer"]} ${props.footerClass}`}
          >
            {props.footer}
          </footer>
        </form>
      </header>
    </div>
  );
  return createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

const Modal: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes.modal}
      >
        <ModalOverLay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
