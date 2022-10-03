import * as React from "react";
import PokerSession from "./PokerSession.js";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import AddIcon from "@mui/icons-material/Add";
import { PokerSessionsContext } from "./PokerSessionsState";

export class PokerSessions extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  getAutofill = () => {
    const { pokerSessions } = this.context;
    const autofill = {};

    autofill.location = [
      ...new Set(pokerSessions.map((pSess) => pSess.location)),
    ]
      .sort()
      .filter((el) => el);
    autofill.stakes = [
      ...new Set(pokerSessions.map((pSess) => pSess.stakes)),
    ].filter((el) => el);
    if (autofill.stakes.length <= 4) {
      autofill.stakes = [...new Set([...autofill.stakes, "1/2", "1/3", "2/5"])];
    }
    autofill.stakes = autofill.stakes.sort(
      (a, b) => Number(a.split("/").at(-1)) - Number(b.split("/").at(-1))
    );
    autofill.game = [
      ...new Set([
        ...pokerSessions.map((pSess) => pSess.game),
        "No-Limit Hold'em",
        "Pot-Limit Omaha",
      ]),
    ]
      .sort()
      .filter((el) => el);

    return autofill;
  };

  render() {
    const { pokerSessions, crud } = this.context;
    const autofill = this.getAutofill();

    return (
      <Card variant="outlined">
        <CardContent sx={{ position: "relative" }}>
          <Typography
            variant="h6"
            sx={{ color: "text.disabled", position: "absolute" }}
          >
            <TableBarIcon sx={{ verticalAlign: "sub" }} />
          </Typography>
          <Box sx={{ position: "absolute", right: "0", marginRight: 2 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={crud.create}
            >
              New
            </Button>
          </Box>
          <Typography variant="h6" align="center">
            Sessions
          </Typography>
          <br />
          {pokerSessions.map((pokerSession) => {
            return (
              <PokerSession
                key={pokerSession.id}
                pokerSession={pokerSession}
                autofill={autofill}
                crud={crud}
              />
            );
          })}

          {pokerSessions.length === 0 && (
            <React.Fragment>
              <Typography align="center">♣♥♠♦</Typography>
              <Typography
                align="center"
                sx={{ color: "text.secondary", fontStyle: "italic" }}
              >
                No sessions.
                <br />
                Shouldn't you be out playing poker?
              </Typography>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    );
  }
}
PokerSessions.contextType = PokerSessionsContext;

export default PokerSessions;
