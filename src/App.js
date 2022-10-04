import React from "react";
import { Container, Box } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";
import PokerLineChart from './Poker/PokerLineChart.js';
import PokerBarChart from './Poker/PokerBarChart.js';


function App() {
  return (
    <div className="App">
      <PokerAppBar />
      <Container>
        <br />
        <PokerSessionsState>
          <PnlCard />
          <br />
          <Box height="100px" width="100%">
            <PokerLineChart />
          </Box>
          <Box height="50px" width="100%">
            <PokerBarChart />
          </Box>
          <br />
          <PokerSessions />
        </PokerSessionsState>
        <br />
      </Container>
    </div>
  );
}

export default App;
