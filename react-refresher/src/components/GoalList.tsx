import React from "react";

import classes from './GoalList.module.css'

const GoalList: React.FC = () => {
  return (
    <ul className={classes['goal-list']}>
      <li>Finish course</li>
      <li>Do something else</li>
    </ul>
  );
};

export default GoalList;
