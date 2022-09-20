import * as React from 'react';

import {Box, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableBarIcon from '@mui/icons-material/TableBar';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import AddIcon from '@mui/icons-material/Add';

function PokerSession() {
  return (
    <Card variant="outlined">
      <CardContent sx={{position: 'relative'}}>
        <TableBarIcon sx={{ color: 'text.disabled', position: 'absolute'}}/>
        <Box sx={{position: "absolute", right: '0', marginRight: 2}}>
          <Button variant="contained" size="small" startIcon={<AddIcon />}>
            New
          </Button>
        </Box>
        <Typography variant="h6" align="center">Sessions</Typography>
        <br/>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <EmojiEventsOutlinedIcon />
            <Typography color="error" sx={{fontWeight: 'bold'}}>&nbsp;•&nbsp;</Typography>
            <Typography>Mirage</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <LocalAtmOutlinedIcon/>
            <Typography color="error" sx={{visibility: "hidden", fontWeight: 'bold'}}>&nbsp;•&nbsp;</Typography>
            <Typography>Wynn</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default PokerSession;