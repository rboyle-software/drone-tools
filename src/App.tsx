import React from 'react';
import InputForm from './InputForm';
import DisplayResult from './DisplayResult';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PROP TIP SPEED CALC</p>
      </header>
      <DisplayResult />
      <InputForm test={'test'} />
    </div>
  );
}

export default App;
