import * as React from 'react';

import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PokerSessionForm from "./PokerSessionForm";

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
    const location = this.props.details.location;
    const details = this.props.details;

    return (
      <Accordion expanded={this.state.expanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={this.toggleExpanded}>
          <EmojiEventsOutlinedIcon />
          <Typography color="error" sx={{fontWeight: 'bold'}}
                      visibility={Boolean(details.endDateTime) ? 'hidden' : 'visible'}>
            &nbsp;•&nbsp;
          </Typography>
          <Typography>{location}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PokerSessionForm valuesObj={this.props.details} closeHandler={this.toggleExpanded} />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default PokerSession;