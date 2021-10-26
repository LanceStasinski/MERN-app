import { useCallback, useReducer } from "react";

interface InputItem {
  value: string| null;
  isValid: boolean;
}

interface Inputs {
  [id: string]: InputItem | undefined;
}

interface State {
  inputs: Inputs;
  isValid: boolean;
}

// interface Action {
//   type: string;
//   inputId: string;
//   isValid: boolean;
//   value: string;
//   inputs: Inputs;
//   formIsValid: boolean
// }

const formReducer = (state: State, action: any) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId]!.isValid;
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
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
    (id: string, value: File | string | undefined, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData: Inputs, formValidity: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    })
  }, [])

  const formValidation: [
    State,
    (id: string, value: File | string | undefined, isValid: boolean) => void,
    (inputData: Inputs, formValidity: boolean) => void
  ] = [formState, inputHandler, setFormData];

  return formValidation;
};
