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
      <PokerSessionsState>
        <PokerAppBar />
        <Container sx={{my: 2}}>
          {/* <br /> */}
          <PnlCard />
          <br />
          <Typography sx={{ ml: 2 }}>
            Line chart of profit over time.
          </Typography>
          <Box sx={{ height: { xs: 100, sm: 200 } }} width="100%">
            <PokerLineChart />
          </Box>
          <Typography sx={{ ml: 2 }}>
            Bar chart of 25 most recent sessions.
          </Typography>
          <Box sx={{ height: { xs: 50, sm: 100 } }} width="100%">
            <PokerBarChart />
          </Box>
          <br />
          <PokerSessions />
        </Container>
      </PokerSessionsState>
    </div>
  );
}

export default App;
