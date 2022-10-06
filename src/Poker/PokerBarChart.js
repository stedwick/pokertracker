import React, { useContext } from "react";
import currency from "currency.js";
import { PokerSessionsContext } from "./PokerSessionsState";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  //   Tooltip,
  Legend,
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

  const barLegendPayload = [
    {
      inactive: false,
      dataKey: "profitPositive",
      type: "rect",
      color: theme.palette.success.main,
      value: "profitPositive",
      payload: {
        dataKey: "profitPositive",
        stackId: "a",
        fill: "#66bb6a",
        xAxisId: 0,
        yAxisId: 0,
        legendType: "rect",
        minPointSize: 0,
        hide: false,
        data: [],
        layout: "vertical",
        isAnimationActive: true,
        animationBegin: 0,
        animationDuration: 400,
        animationEasing: "ease",
      },
    },
    // {
    //   inactive: false,
    //   dataKey: "profitNegative",
    //   type: "rect",
    //   color: "#f44336",
    //   value: "profitNegative",
    //   payload: {
    //     dataKey: "profitNegative",
    //     stackId: "a",
    //     fill: "#f44336",
    //     xAxisId: 0,
    //     yAxisId: 0,
    //     legendType: "rect",
    //     minPointSize: 0,
    //     hide: false,
    //     data: [],
    //     layout: "vertical",
    //     isAnimationActive: true,
    //     animationBegin: 0,
    //     animationDuration: 400,
    //     animationEasing: "ease",
    //   },
    // },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <Legend
          formatter={() => <>&nbsp;recent sessions</>}
          payload={barLegendPayload}
          verticalAlign="top"
          align="left"
          iconSize={10}
        />
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
