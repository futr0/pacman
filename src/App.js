import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      {score}
      <Header score={score}>

      </Header>
    </div>
  );
}

export default App;
