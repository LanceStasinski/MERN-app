import React from "react";

import classes from "./GoalList.module.css";
import Goal from "../models/goals";

const GoalList: React.FC<{ goals: Goal[] }> = (props) => {
  return (
    <ul className={classes["goal-list"]}>
      {props.goals.map((goal) => {
        return <li key={goal.id} id={goal.id}>{goal.text}</li>;
      })}
    </ul>
  );
};

export default GoalList;
