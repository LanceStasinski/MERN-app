import React, { useReducer } from "react";

import { validate } from "../../../util/validators";
import classes from "./Input.module.css";

const Input: React.FC<{
  label?: string;
  id?: string;
  element?: string;
  type?: string;
  placeHolder?: string;
  rows?: number;
  errorText?: string;
  validators: {type: string, val: number}[]
}> = (props) => {
  const inputReducer = (
    state: { value: string; isValid: boolean; isTouched: boolean },
    action: { type: string; val: string; validators: {type: string, val: number}[] }
  ) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          value: action.val,
          isValid: validate(action.val, action.validators),
        };
      case 'TOUCH': {
        return {
          ...state,
          isTouched: true
        }
      }
      default:
        return state;
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  const changeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "CHANGE", val: event.currentTarget.value, validators: props.validators });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
      val: '',
      validators: [{
        type: '',
        val: 0
      }]
    })

    }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeHolder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${classes["form-control"]} ${
        !inputState.isValid && inputState.isTouched && classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
