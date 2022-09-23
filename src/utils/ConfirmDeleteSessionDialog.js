import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box} from "@mui/material";
const dayjs = require('dayjs');

export default function ConfirmDeleteSessionDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>
        <Box display='flex'>
          <Box mr={1}>
            <WarningIcon sx={{verticalAlign: 'sub'}} />
          </Box>
          <Box>
            Please Confirm
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Really delete poker session?
          <br/>
          -&gt; {[props.pokerSession.stakes, [props.pokerSession.location,
              dayjs(props.pokerSession.startDateTime).format('MMM D')].filter(Boolean).join(', ')].filter(Boolean).join(' ')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{p: 2, justifyContent: 'space-between'}}>
        <Button variant='outlined' onClick={props.handleClose} startIcon={<SaveIcon/> } autoFocus>Keep</Button>
        <Button variant="contained" color='error' onClick={props.handleDelete} startIcon={<DeleteIcon/>}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
