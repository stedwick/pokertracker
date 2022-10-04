import React, { useContext } from "react";
import currency from "currency.js";
import { PokerSessionsContext } from "./PokerSessionsState";

import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import produce from "immer";

export default function PokerLineChart() {
  const { pokerSessions, crud } = useContext(PokerSessionsContext);
  const sortedPokerSessions = produce(pokerSessions, (draft) =>
    draft.reverse()
  );
  const chartData = [{profit: 0}];

  sortedPokerSessions.reduce((sum, pSess, i) => {
    const profit = crud.calcSessionProfit(pSess, true);
    sum = sum.add(profit);
    chartData.push({ profit: Number(sum.value) });
    return sum;
  }, currency(0, { precision: 0 }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <ReferenceLine y={0} stroke="orange" strokeDasharray="5 5" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
