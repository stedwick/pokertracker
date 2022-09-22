import React from "react";
import {Container} from '@mui/material';
import PokerAppBar from "./layout/PokerAppBar";
import {PnlCard} from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";

function App() {
  return (
    <div className="App">
      <PokerAppBar />
      <Container>
        <br />
        <PnlCard />
        <br/>
        <PokerSessions/>
        <br/>
      </Container>
    </div>
  );
}

export default App;