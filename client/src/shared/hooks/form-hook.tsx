import { useCallback, useReducer } from "react";

interface InputItem {
  value: string;
  isValid: boolean;
}

interface Inputs {
  [id: string]: InputItem;
}

interface State {
  inputs: Inputs;
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

export const useForm = (
  initialInputs: Inputs,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
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

  const formValidation: [
    State,
    (id: string, value: string, isValid: boolean) => void
  ] = [formState, inputHandler];

  return formValidation;
};
