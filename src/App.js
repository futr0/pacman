import React, { useState } from 'react';
import Header from './components/Header/Header';
import Board from './components/Board';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      {score}
      <Header score={score}/>
      <Board setScore={setScore}/>
    </div>
  );
}

export default App;
