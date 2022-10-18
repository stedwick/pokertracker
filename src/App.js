import React from "react";
import { Container, Box, Typography } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";
import PokerUserState, { PokerUserContext } from "./layout/userState";
import PokerLineChart from "./Poker/PokerLineChart.js";
import PokerBarChart from "./Poker/PokerBarChart.js";

function App() {
  return (
    <div className="App">
      <PokerUserState>
        <PokerUserContext.Consumer>
          {(value) => (
            <PokerSessionsState firestoreUser={value.firestoreUser}>
              <PokerAppBar />
              <Container sx={{ my: 2 }}>
                {/* <br /> */}
                <PnlCard pokerUser={value.pokerUser} crud={value.crud} />
                <Box
                  sx={{ px: 1, mt: 1, height: { xs: 125, sm: 250 } }}
                  width="100%"
                >
                  <PokerLineChart />
                </Box>
                <Box
                  sx={{ px: 1, mb: 1, height: { xs: 75, sm: 150 } }}
                  width="100%"
                >
                  <PokerBarChart />
                </Box>
                <PokerSessions />
              </Container>
            </PokerSessionsState>
          )}
        </PokerUserContext.Consumer>
      </PokerUserState>
    </div>
  );
}

export default App;
