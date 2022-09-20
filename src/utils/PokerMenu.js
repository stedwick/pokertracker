import * as React from 'react';
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from '@mui/material';
import {Logout} from "@mui/icons-material";
import {PokerUser} from "./PokerUser";

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
        {/*<MenuItem onClick={closeHandler}>My account</MenuItem>*/}
        {/*<MenuItem onClick={closeHandler}>Logout</MenuItem>*/}
        {/*<Divider/>*/}
        <MenuItem onClick={PokerUser.signOut}>
          <ListItemIcon><Logout color="secondary"/></ListItemIcon>
          <ListItemText>
            <Typography color="secondary">
              Logout
            </Typography>
          </ListItemText>
        </MenuItem>
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
