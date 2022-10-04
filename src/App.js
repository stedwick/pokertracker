import React from "react";
import { Container, Box } from "@mui/material";
import PokerAppBar from "./layout/PokerAppBar";
import { PnlCard } from "./Poker/PnlCard";
import PokerSessions from "./Poker/PokerSessions";
import PokerSessionsState from "./Poker/PokerSessionsState";

import { ResponsiveContainer, BarChart, Bar } from "recharts";
import PokerLineChart from './Poker/PokerLineChart.js';

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function PhilsBar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

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
          <Box height="100px" width="100%">
            <PhilsBar />
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
