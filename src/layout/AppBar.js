import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import {PokerUser} from "../utils/PokerUser";

export default function ButtonAppBar() {
  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyleIcon/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;Poker Tracker
          </Typography>
          <PokerUser/>
        </Toolbar>
      </AppBar>
    // </Box>
  );
}
