import * as React from 'react';
import {Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography, Link} from '@mui/material';
import {Logout} from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
      <Link href="mailto:poker-tracker-phil@googlegroups.com"
            underline="none" onClick={props.closeHandler}
      >
        <MenuItem>
          <ListItemIcon><EmailIcon/></ListItemIcon>
          <ListItemText>
            <Typography color="text.primary">
              Email support
            </Typography>
          </ListItemText>
        </MenuItem>
      </Link>
      <Link href="https://philipbrocoum.com/"
        target="_blank" underline="none" onClick={props.closeHandler}
      >
        <MenuItem>
          <ListItemIcon><OpenInNewIcon color="primary"/></ListItemIcon>
          <ListItemText>
            <Typography>
              Made by Phil
            </Typography>
          </ListItemText>
        </MenuItem>
      </Link>
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
