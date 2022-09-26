import * as React from 'react';

import {Accordion, AccordionSummary, Typography, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PokerSessionForm from "./PokerSessionForm";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { orange } from '@mui/material/colors';

export class PokerSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({expanded: !Boolean(prevState.expanded)}));
  }

  render() {
    const location = this.props.pokerSession.location;
    const pokerSession = this.props.pokerSession;
    let sessionIcon;
    if (pokerSession.cashOrTourney === "cashGame") {
      sessionIcon = <LocalAtmOutlinedIcon />
      // sessionIcon = <PaidOutlinedIcon />
    } else {
      sessionIcon = <EmojiEventsOutlinedIcon />
    }

    let isNew = false;
    if (pokerSession.isNew) {
      isNew = 
        <React.Fragment>
          <FiberNewIcon sx={{ color: orange[500] }} />
          &nbsp;
        </React.Fragment>
    }

    return (
      <Accordion expanded={this.state.expanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={this.toggleExpanded}>
          {sessionIcon}
          <Typography color="error" sx={{fontWeight: 'bold'}}
                      visibility={Boolean(pokerSession.endDateTime) ? 'hidden' : 'visible'}>
            &nbsp;•&nbsp;
          </Typography>
          {isNew}
          <Typography>{location}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PokerSessionForm pokerSession={this.props.pokerSession}
            closeHandler={this.toggleExpanded} crud={this.props.crud}
            autofill={this.props.autofill} 
          />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default PokerSession;