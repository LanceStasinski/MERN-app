import React, { FormEvent } from "react";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../shared/components/FormElements/Input";
import classes from "./PlaceForm.module.css";
import Button from '../../shared/components/FormElements/Button'
import { useForm } from "../../shared/hooks/form-hook";


interface InputItem {
  value: string,
  isValid: boolean
}

interface Inputs {
  [id: string]: InputItem
}

interface State {
  inputs: Inputs
  isValid: boolean;
}

const NewPlace: React.FC = () => {
  const [formState, inputHandler]: [State, ((id: string, value: string, isValid: boolean) => void)] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  }, false)


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
