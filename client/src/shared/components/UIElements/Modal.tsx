import React, { FormEvent, ReactNode } from "react";
import ReactDOM  from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
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
  footer?: ReactNode;
  nodeRef?: React.MutableRefObject<null>
};

const ModalOverLay: React.FC<Props> = (props) => {
  const content = (
    <div
      ref={props.nodeRef}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
        <form
          onSubmit={
            props.onSubmit
              ? props.onSubmit
              : (event: FormEvent) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer
            className={`modal__footer ${props.footerClass}`}
          >
            {props.footer}
          </footer>
        </form>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

const Modal: React.FC<Props> = (props) => {
  const nodeRef = React.useRef(null);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
        nodeRef={nodeRef}
      >
        <ModalOverLay {...props} nodeRef={nodeRef}/>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
