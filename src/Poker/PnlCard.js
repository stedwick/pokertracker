import * as React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export class PnlCard extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'text.disabled', position: 'absolute'}}>
            <AccountBalanceIcon sx={{ verticalAlign: 'sub'}}/>
          </Typography>
          <Typography variant="h6" align="center">Bankroll</Typography>
          <Typography variant="h4" align="center" sx={{ color: 'success.main' }}>+$1,000,000</Typography>
        </CardContent>
      </Card>
    );
  }
}
