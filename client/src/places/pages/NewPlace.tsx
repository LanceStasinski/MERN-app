import React from "react";

import Input from "../../shared/components/FormElements/Input";
import classes from "./NewPlace.module.css";

const NewPlace: React.FC = () => {
  return (
    <form className={classes["place-form"]}>
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid title"
      />
    </form>
  );
};

export default NewPlace;
