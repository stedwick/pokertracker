import * as React from 'react';
import {Menu, MenuItem} from '@mui/material';

export default function PokerMenu(props) {
  const isOpen = props.isOpen;
  const closeHandler = props.closeHandler;

  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      open={isOpen}
      onClose={closeHandler}
    >
      <MenuItem onClick={closeHandler}>Profile</MenuItem>
      <MenuItem onClick={closeHandler}>My account</MenuItem>
      <MenuItem onClick={closeHandler}>Logout</MenuItem>
    </Menu>
  );
}
