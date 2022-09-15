import React from "react";
import {PokerUser} from "./utils/PokerUser";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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