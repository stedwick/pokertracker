import React, { useContext } from "react";
import currency from "currency.js";
import { PokerSessionsContext } from "./PokerSessionsState";
import { LTTB } from "downsample";
// import produce from "immer";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  // Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import { useTheme } from "@emotion/react";

export default function PokerLineChart() {
  const { pokerSessions, crud } = useContext(PokerSessionsContext);
  const theme = useTheme();

  const pokerSessionsProfit = pokerSessions.map((pSess) => {
    return Number(
      currency(crud.calcSessionProfit(pSess, true), { precision: 0 })
    );
  });
  pokerSessionsProfit.push(0);
  pokerSessionsProfit.reverse();
  //   const sortedPokerSessions = produce(pokerSessions, (draft) =>
  //     draft.reverse()
  //   );
  const pokerSessionsRunningTotal = [];
  pokerSessionsProfit.reduce((sum, profit, i) => {
    const total = sum + profit;
    pokerSessionsRunningTotal.push({
      x: i,
      y: total,
    });
    return total;
  }, 0);

  const downsampled = LTTB(pokerSessionsRunningTotal, 100);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={downsampled}>
        <Legend
          formatter={() => <>&nbsp;profit over time</>}
          verticalAlign="top"
          align="left"
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke={theme.palette.mode === 'dark' ? "#8884d8" : 'blueviolet'}
          strokeWidth={2}
          dot={false}
        />
        <ReferenceLine y={0} stroke="orange" strokeDasharray="5 5" />
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
