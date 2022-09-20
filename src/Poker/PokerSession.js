import * as React from 'react';

import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

export class PokerSession extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = this.props.details.location;

    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <EmojiEventsOutlinedIcon />
          <Typography color="error" sx={{fontWeight: 'bold'}}>&nbsp;•&nbsp;</Typography>
          <Typography>{location}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default PokerSession;