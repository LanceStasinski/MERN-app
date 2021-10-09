import React from "react";

import classes from "./NewGoal.module.css";

const NewGoal: React.FC = () => {
  return (
    <form className={classes['new-goal']}>
      <input type="text" />
      <button type="submit">Add Goal </button>
    </form>
  );
};

export default NewGoal;
