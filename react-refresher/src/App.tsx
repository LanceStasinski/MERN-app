import React from "react";
import "./App.css";

import GoalList from "./components/GoalList";
import Goal from './models/goals'

function App() {
  const courseGoals = [
    new Goal('Goal 1'),
    new Goal('Goal 2'),
    new Goal('Goal 3')
  ];

  return (
    <div>
      <h2 className="goal-list">Course Goals</h2>
      <GoalList goals={courseGoals}/>
    </div>
  );
}

export default App;
