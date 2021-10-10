import React, { useState } from "react";
import "./App.css";

import GoalList from "./components/GoalList/GoalList";
import Goal from "./models/goal";
import NewGoal from "./components/NewGoal/NewGoal";

function App() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([
    new Goal("Goal 1"),
    new Goal("Goal 2"),
    new Goal("Goal 3"),
  ]);

  const addNewGoalHandler = (newGoal: Goal) => {
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
  };

  return (
    <div>
      <h2 className="goal-list">Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
}

export default App;
