import * as React from 'react';
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from '@mui/material';
import {Logout} from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {PokerUser} from "./PokerUser";

export default function PokerMenu(props) {
  let menuProps = {
    open: props.isOpen,
    onClose: props.closeHandler
  };
  if (Boolean(props.anchorEl)) {
    menuProps.anchorEl = props.anchorEl;
  } else {
    menuProps.anchorReference = "anchorPosition";
    menuProps.anchorPosition = { top: 0, left: 0 };
  }

  return (
    <Menu {...menuProps}>
      <MenuItem onClick={window.toggleTheme}>
        <ListItemIcon><Brightness4Icon/></ListItemIcon>
        <ListItemText>
          <Typography>
            Light/Dark
          </Typography>
        </ListItemText>
      </MenuItem>
      <Divider/>
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
}
