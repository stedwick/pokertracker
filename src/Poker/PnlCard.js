import * as React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export class PnlCard extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <AccountBalanceIcon sx={{ color: 'text.disabled', position: 'absolute'}}/>
          <Typography variant="h6" align="center">Bankroll</Typography>
          <Typography variant="h4" align="center" sx={{ color: 'success.main' }}>+$1,000,000</Typography>
        </CardContent>
      </Card>
    );
  }
}
