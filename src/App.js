import React from "react";
import {Container} from '@mui/material';
import PokerAppBar from "./layout/PokerAppBar"

function App() {
  return (
    <div className="App">
      <PokerAppBar />
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