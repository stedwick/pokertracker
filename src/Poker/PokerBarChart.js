import React, { useContext } from "react";
import currency from "currency.js";
import { PokerSessionsContext } from "./PokerSessionsState";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
//   Tooltip,
} from "recharts";
import { useTheme } from "@emotion/react";

export default function PokerBarChart() {
  const { pokerSessions, crud } = useContext(PokerSessionsContext);
  const theme = useTheme();

  const chartData = pokerSessions.slice(0, 25).map((pSess) => {
    const profit = Number(
      currency(crud.calcSessionProfit(pSess, true), { precision: 0 })
    );
    return {
      profit: profit,
      profitPositive: profit > 0 ? profit : 0,
      profitNegative: profit < 0 ? profit : 0,
    };
  });
  chartData.reverse();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <Bar
          dataKey="profitPositive"
          stackId="a"
          fill={theme.palette.success.main}
        />
        <Bar
          dataKey="profitNegative"
          stackId="a"
          fill={theme.palette.error.main}
        />
        {/* <Tooltip content={<CustomTooltip />} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}
