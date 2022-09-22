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
          "sortDateTime": nowDateTime.subtract(72, 'hour'),
          "stakes": "1/3",
          "buyIn": 500,
          "cashOut": 700,
          "startDateTime": nowDateTime.subtract(72, 'hour'),
          "endDateTime": nowDateTime.subtract(70, 'hour'),
          "location": "Wynn",
          "notes": "🍹 Tasty watermelon juice",
          "cashOrTourney": "cashGame"
        },
        {
          "id": idGen.next().value,
          "createdAt": nowDateTime,
          "sortDateTime": nowDateTime.subtract(48, 'hour'),
          "stakes": "",
          "buyIn": 1000,
          "cashOut": 0,
          "startDateTime": nowDateTime.subtract(48, 'hour'),
          "endDateTime": nowDateTime.subtract(44, 'hour'),
          "location": "Aria",
          "notes": "Visited the PokerGo studios",
          "cashOrTourney": "tournament"
        },
        {
          "id": idGen.next().value,
          "createdAt": nowDateTime,
          "sortDateTime": nowDateTime.subtract(24, 'hour'),
          "stakes": "2/5",
          "buyIn": 1000,
          "cashOut": 1950,
          "startDateTime": nowDateTime.subtract(24, 'hour'),
          "endDateTime": nowDateTime.subtract(16, 'hour'),
          "location": "Ballys",
          "notes": `WSOP ${nowDateTime.format('YYYY').toString()} let's gooo`,
          "cashOrTourney": "cashGame"
        }
      ].sort(pSess=>pSess.sortDateTime).reverse()
    };
  }

  addPokerSession = () => {
    const nowDateTime = dayjs();
    const newSession = {
      "id": this.state.idGen.next().value,
      "createdAt": nowDateTime,
      "sortDateTime": nowDateTime,
      "stakes": "1/2",
      "buyIn": 150,
      "cashOut": "",
      "startDateTime": nowDateTime,
      "endDateTime": "",
      "location": "My Local Poker Room",
      "notes": "",
      "cashOrTourney": "cashGame"
    }
    this.setState(prevState => (
      {pokerSessions: [newSession, ...prevState.pokerSessions]})
    );
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
            return <PokerSession key={pokerSession.id} details={pokerSession}/>
          })}
        </CardContent>
      </Card>
    );
  }
}

export default PokerSessions;