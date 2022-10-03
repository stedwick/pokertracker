import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { PokerSessionsContext } from "./PokerSessionsState";
import currency from "currency.js";

export class PnlCard extends React.Component {
  render() {
    const { crud, pokerSessions } = this.context;
    const balance = crud.calcTotalProfit(pokerSessions).add(999839);

    return (
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ color: "text.disabled", position: "absolute" }}
          >
            <AccountBalanceIcon sx={{ verticalAlign: "sub" }} />
          </Typography>
          <Typography variant="h6" align="center">
            Bankroll
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "success.main" }}
          >
            {currency(balance, {precision: 0}).format()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
PnlCard.contextType = PokerSessionsContext;
