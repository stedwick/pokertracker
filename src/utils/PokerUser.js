import React from "react";
import { Button, Avatar } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PokerMenu from "./PokerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { PokerUserContext } from "../layout/userState";

export class PokerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false, menuAnchor: null };
  }

  openMenu = (event) => {
    this.setState({ menuIsOpen: true, menuAnchor: event.currentTarget });
  };
  closeMenu = () => {
    this.setState({ menuIsOpen: false });
  };

  render() {
    const myUser = this.context.pokerUser;
    const menuIsOpen = this.state.menuIsOpen;
    const menuAnchor = this.state.menuAnchor;

    if (!myUser.demo) {
      return (
        <React.Fragment>
          <Button onClick={this.openMenu} sx={{ pr: 0 }}>
            <Avatar alt={myUser.email} src={myUser.photoURL} sx={{ mr: 2 }} />
            <MenuIcon sx={{ color: "white" }} />
          </Button>
          <PokerMenu
            isOpen={menuIsOpen}
            anchorEl={menuAnchor}
            closeHandler={this.closeMenu}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={this.context.crud.signIn}
          >
            Login
          </Button>
        </React.Fragment>
      );
    }
  }
}
PokerUser.contextType = PokerUserContext;
