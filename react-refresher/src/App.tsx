import React from 'react';
import './App.css';

import GoalList from './components/GoalList'

function App() {
  return (
    <div>
      <h2 className='goal-list'>Course Goals</h2>
      <GoalList />
    </div>
  );
}

export default App;
