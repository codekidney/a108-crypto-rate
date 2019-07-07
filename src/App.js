import React from 'react';
import './App.css';
import Crypto from './Crypto';

function App() {
  return (
    <div className="App">
      <h1>Crypto Rate</h1>
      <div className="container pb-3">
        <Crypto />
      </div>
    </div>
  );
}

export default App;
