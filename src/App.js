import React from "react";
import {Container} from '@mui/material';
import PokerAppBar from "./layout/PokerAppBar"
import {PnlCard} from "./PnlCard"

function App() {
  return (
    <div className="App">
      <PokerAppBar />
      <Container>
        <br />
        <PnlCard />
      </Container>
    </div>
  );
}

export default App;