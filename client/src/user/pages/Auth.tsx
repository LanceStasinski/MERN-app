import React, { FormEvent, useState, useContext } from "react";
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
import { AuthContext } from "../../shared/context/auth-context";

const REST_API = process.env.REACT_APP_REST_API;

const Auth: React.FC = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email!.isValid && formState.inputs.password!.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authenticateHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        const response = await fetch(`${REST_API}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name!.value,
            email: formState.inputs.email!.value,
            password: formState.inputs.password!.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }

    auth.login();
  };
  return (
    <Card className={`${classes.authentication} pad`}>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authenticateHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
