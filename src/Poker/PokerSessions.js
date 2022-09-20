import * as React from 'react';
import PokerSession from "./PokerSession.js";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import AddIcon from "@mui/icons-material/Add";

export class PokerSessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokerSessions: [
      {location: "Mirage"},
      {location: "Wynn"},
      {location: "Aria"}
    ]};
  }

  addPokerSession = () => {
    this.setState(prevState => (
      {pokerSessions: [{location: "Lorem"}, ...prevState.pokerSessions]})
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
          {pokerSessions.map((pokerSession, index)=>{
            return <PokerSession key={index} details={pokerSession}/>
          })}
        </CardContent>
      </Card>
    );
  }
}

export default PokerSessions;