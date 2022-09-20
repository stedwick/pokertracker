import * as React from 'react';
import {Menu, MenuItem} from '@mui/material';

export default function PokerMenu(props) {
  const isOpen = props.isOpen;
  const closeHandler = props.closeHandler;
  const anchorEl = props.anchorEl;

  if (isOpen){
    return (
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closeHandler}
      >
        <MenuItem onClick={closeHandler}>Profile</MenuItem>
        <MenuItem onClick={closeHandler}>My account</MenuItem>
        <MenuItem onClick={closeHandler}>Logout</MenuItem>
      </Menu>
    );
  } else {
    return (
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        open={isOpen}
      >
      </Menu>
    );
  }

}
