import React, { ChangeEvent, useReducer } from "react";

import classes from "./Input.module.css";

const Input: React.FC<{
  label?: string;
  id?: string;
  element?: string;
  type?: string;
  placeHolder?: string;
  rows?: number;
  errorText?: string;
  validators?: []
}> = (props) => {
  const inputReducer = (
    state: { value: string; isValid: boolean },
    action: { type: string; val: string }
  ) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          value: action.val,
          isValid: true,
        };
      default:
        return state;
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "CHANGE", val: event.currentTarget.value });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeHolder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${classes["form-control"]} ${
        !inputState.isValid && classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
