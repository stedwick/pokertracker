import './App.css';
import logo from './logo.svg';

import React from "react";
import {PokerUser} from "./utils/PokerUser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>

        <button onClick={PokerUser.signIn}>
          ✅ Activate Lasers
        </button>
        <button onClick={PokerUser.signOut}>
          🚪 Sign Out
        </button>
        <PokerUser/>

        <p>
          Philip's app! ⭐ Bingo. Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;