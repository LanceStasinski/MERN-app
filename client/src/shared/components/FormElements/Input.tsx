import React from "react";

import classes from "./Input.module.css";

const Input: React.FC<{
  label?: string;
  id?: string;
  element?: string;
  type?: string;
  placeHolder?: string,
  rows?: number
}> = (props) => {
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeHolder}/>
    ) : (
      <textarea id={props.id} rows={props.rows || 3}/>
    );
  return (
    <div className={`${classes["form-control"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
