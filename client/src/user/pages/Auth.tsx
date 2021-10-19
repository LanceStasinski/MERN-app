import React, { FormEvent } from "react";
import Input from "../../shared/components/FormElements/Input";

import { useForm } from "../../shared/hooks/form-hook";
import classes from "./Auth.module.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

const Auth: React.FC = () => {
  const [formState, inputHanlder] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authenticateHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <Card className={`${classes.authentication} pad`}>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authenticateHandler}>
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHanlder}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password."
          onInput={inputHanlder}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
