import React from "react";
import { Container } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";

function App() {
  return (
    <div className="App">
      <PokerAppBar />
      <Container>
        <br />
        <PokerSessionsState>
          <PnlCard />
          <br />
          <PokerSessions />
        </PokerSessionsState>
        <br />
      </Container>
    </div>
  );
}

export default App;
