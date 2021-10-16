import React, { FormEvent, useCallback, useReducer } from "react";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../shared/components/FormElements/Input";
import classes from "./NewPlace.module.css";
import Button from '../../shared/components/FormElements/Button'

interface State {
  inputs: {
    [title: string]: {
      value: string;
      isValid: boolean;
    };
    description: {
      value: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
}

interface Action {
  type: string;
  inputId: string;
  isValid: boolean;
  value: string;
}

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const placeSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs) //send to backend
  }

  return (
    <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type=''
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
