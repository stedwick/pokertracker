import React from "react";
import { Container, Box, Typography } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";
import PokerLineChart from "./Poker/PokerLineChart.js";
import PokerBarChart from "./Poker/PokerBarChart.js";

function App() {
  return (
    <div className="App">
      <PokerAppBar />
      <Container>
        <br />
        <PokerSessionsState>
          <PnlCard />
          <br />
          <Typography sx={{ ml: 2 }}>
            Line chart of profit over time.
          </Typography>
          <Box height="100px" width="100%">
            <PokerLineChart />
          </Box>
          <Typography sx={{ ml: 2 }}>
            Bar chart of 20 most recent sessions.
          </Typography>
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
