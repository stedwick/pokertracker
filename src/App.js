import React from "react";
import { Container, Box, Typography } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";
import PokerLineChart from "./Poker/PokerLineChart.js";
import PokerBarChart from "./Poker/PokerBarChart.js";
import InfoIcon from "@mui/icons-material/Info";

function App() {
  return (
    <div className="App">
      <PokerSessionsState>
        <PokerAppBar />
        <Container sx={{ my: 2 }}>
          {/* <br /> */}
          <PnlCard />
          <Box sx={{ px: 1, mt: 1, height: { xs: 125, sm: 250 } }} width="100%">
            <PokerLineChart />
          </Box>
          <Box sx={{ px: 1, mb: 1, height: { xs: 75, sm: 150 } }} width="100%">
            <PokerBarChart />
          </Box>
          <PokerSessions />
        </Container>
      </PokerSessionsState>
      <Container>
        <Typography
          variant="body1"
          align="center"
          sx={{ mx: 2, mb: 2 }}
          color="text.secondary"
        >
          <InfoIcon fontSize="small" sx={{ verticalAlign: "sub" }} /> This is
          demo data. Sign-in with Google to track your poker profit.
        </Typography>
      </Container>
    </div>
  );
}

export default App;
