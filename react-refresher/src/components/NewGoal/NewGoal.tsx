import React, { useState } from "react";

import classes from "./NewGoal.module.css";
import Goal from "../../models/goal";

const NewGoal: React.FC<{ onAddGoal: (newGoal: Goal) => void }> = (props) => {
  const [enteredText, setEnteredText] = useState('')


  const addGoalHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newGoal = new Goal(enteredText);

    props.onAddGoal(newGoal);

    setEnteredText('')
  };

  const textChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setEnteredText(event.currentTarget.value);
  };

  return (
    <form className={classes["new-goal"]} onSubmit={addGoalHandler}>
      <input type="text" onChange={textChangeHandler} value={enteredText} />
      <button type="submit">Add Goal </button>
    </form>
  );
};

export default NewGoal;
