import React from "react";
import {Button, Container} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from "./layout/AppBar"

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <header className="App-header">
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
      </Container>
    </div>
  );
}

export default App;