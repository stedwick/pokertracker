import * as React from 'react';
import {AppBar, Toolbar, Typography, Box} from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import {PokerUser} from "../utils/PokerUser";

export default function PokerAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <StyleIcon sx={{ verticalAlign: 'sub'}}/>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          &nbsp; Poker Tracker
        </Typography>
        <Box sx={{ display: { xs: 'flex' } }}>
          <PokerUser/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
