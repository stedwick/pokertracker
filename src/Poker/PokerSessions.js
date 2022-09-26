import * as React from 'react';
import PokerSession from "./PokerSession.js";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import AddIcon from "@mui/icons-material/Add";
const dayjs = require('dayjs');

function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

export class PokerSessions extends React.Component {
  constructor(props) {
    super(props);
    const idGen = idMaker();
    const nowDateTime = dayjs();
    this.state = {
      idGen: idGen,
      pokerSessions: [
        {
          "id": idGen.next().value,
          "createdAt": nowDateTime,
          "sortDateTime": nowDateTime.subtract(80, 'hour'),
          "stakes": "1/3",
          "buyIn": 500,
          "cashOut": 700,
          "startDateTime": nowDateTime.subtract(80, 'hour'),
          "endDateTime": nowDateTime.subtract(78, 'hour'),
          "location": "Wynn",
          "game": "No-Limit Hold'em",
          "notes": "🍹 Tasty watermelon juice",
          "cashOrTourney": "cashGame"
        },
        {
          "id": idGen.next().value,
          "createdAt": nowDateTime,
          "sortDateTime": nowDateTime.subtract(56, 'hour'),
          "stakes": "1/2",
          "buyIn": 1000,
          "cashOut": 0,
          "startDateTime": nowDateTime.subtract(56, 'hour'),
          "endDateTime": nowDateTime.subtract(52, 'hour'),
          "location": "Aria",
          "game": "Pot-Limit Omaha",
          "notes": "Visited PokerGo studio",
          "cashOrTourney": "tournament"
        },
        {
          "id": idGen.next().value,
          "createdAt": nowDateTime,
          "sortDateTime": nowDateTime.subtract(32, 'hour'),
          "stakes": "2/5",
          "buyIn": 1000,
          "cashOut": 1950,
          "startDateTime": nowDateTime.subtract(32, 'hour'),
          "endDateTime": nowDateTime.subtract(25, 'hour'),
          "location": "Ballys",
          "game": "No-Limit Hold'em",
          "notes": `WSOP ${nowDateTime.format('YYYY').toString()} let's gooo`,
          "cashOrTourney": "cashGame"
        }
      ].sort(pSess=>pSess.sortDateTime).reverse()
    };
  }

  updatePokerSession = (updatedPokerSession) => {
    this.setState(prevState => {
      const prevPokerSessions = prevState.pokerSessions;
      const index = prevPokerSessions.findIndex(
        pSess => String(pSess.id) === String(updatedPokerSession.id)
      );
      if (index !== -1) {
        const prevPokerSession = prevPokerSessions.at(index);
        const newPokerSession = {...prevPokerSession, ...updatedPokerSession};
        delete newPokerSession.isNew;
        const newPokerSessions = prevPokerSessions;
        newPokerSessions.splice(index, 1, newPokerSession);
        return {pokerSessions: newPokerSessions};
      } else {
        return null;
      }
    });
  }

  addPokerSession = () => {
    const nowDateTime = dayjs();
    let newSession;
    if (this.state.pokerSessions.length > 0) {
      const clonedSession = {...this.state.pokerSessions[0]};
      const blankSession = {
        "id": this.state.idGen.next().value,
        "createdAt": nowDateTime,
        "sortDateTime": nowDateTime,
        "cashOut": "",
        "startDateTime": nowDateTime,
        "endDateTime": "",
        "notes": ""
      };
      newSession = {...clonedSession, ...blankSession};
    } else {
      newSession = {
        "id": this.state.idGen.next().value,
        "createdAt": nowDateTime,
        "sortDateTime": nowDateTime,
        "stakes": "1/2",
        "buyIn": 400,
        "cashOut": "",
        "startDateTime": nowDateTime,
        "endDateTime": "",
        "location": "My Local Poker Room",
        "game": "No-Limit Hold'em",
        "notes": "🃏 Let's run good!",
        "cashOrTourney": "cashGame"
      };
    }
    newSession.isNew = true;
    this.setState(prevState => (
      {pokerSessions: [newSession, ...prevState.pokerSessions]})
    );
  }

  deletePokerSession = (pokerSession) => {
    // alert("deleting");
    const pSessIndex = this.state.pokerSessions.findIndex(pSess=>pSess.id===pokerSession.id);
    if (pSessIndex > -1) {
      this.setState((prevState) => {
        let splicedPokerSessions = [...prevState.pokerSessions];
        splicedPokerSessions.splice(pSessIndex, 1);
        return {pokerSessions: splicedPokerSessions};
      });
    }
  }

  render() {
    const pokerSessions = this.state.pokerSessions;

    return (
      <Card variant="outlined">
        <CardContent sx={{position: 'relative'}}>
          <Typography variant="h6" sx={{ color: 'text.disabled', position: 'absolute'}}>
            <TableBarIcon sx={{ verticalAlign: 'sub'}}/>
          </Typography>
          <Box sx={{position: "absolute", right: '0', marginRight: 2}}>
            <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={this.addPokerSession}>
              New
            </Button>
          </Box>
          <Typography variant="h6" align="center">Sessions</Typography>
          <br/>
          {pokerSessions.map((pokerSession)=>{
            return <PokerSession key={pokerSession.id} pokerSession={pokerSession}
                                 crud={{update: this.updatePokerSession,
                                        delete: this.deletePokerSession}}/>
          })}

          {pokerSessions.length === 0 &&
            <React.Fragment>
              <Typography align='center'>
                ♣♥♠♦
              </Typography>
              <Typography align='center' sx={{color: 'text.secondary', fontStyle: 'italic'}}>
                No sessions.<br/>
                Shouldn't you be out playing poker?
              </Typography>
            </React.Fragment>
          }
        </CardContent>
      </Card>
    );
  }
}

export default PokerSessions;