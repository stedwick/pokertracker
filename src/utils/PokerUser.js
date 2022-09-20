import React from "react";
import {onAuthStateChanged, signInWithRedirect, signOut} from "firebase/auth";
import {auth, authGoogle} from "./firebase";
import {Button, IconButton, Avatar} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PokerMenu from "./PokerMenu";

export class PokerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myUser: null,
                  menuIsOpen: false};
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({myUser: user});
        // window.user = user;
      } else {
        // User is signed out
        this.setState({myUser: null});
      }
    });
  }

  static signIn() {
    signInWithRedirect(auth, authGoogle);
  }

  static signOut() {
    signOut(auth);
  }

  openMenu = () => {
    this.setState({menuIsOpen: true});
  }
  closeMenu = () => {
    this.setState({menuIsOpen: false});
  }

  render() {
    const myUser = this.state.myUser;
    const menuIsOpen = this.state.menuIsOpen;

    if (myUser) {
      return (
        <React.Fragment>
          <Button onClick={this.openMenu}>
            <Avatar alt={myUser.email} src={myUser.photoURL}/>
          </Button>
          <PokerMenu isOpen={menuIsOpen} closeHandler={this.closeMenu}/>
          <IconButton alt="Logout" variant="outlined" color="secondary" onClick={PokerUser.signOut}>
            <LogoutIcon/>
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button variant="contained" startIcon={<LoginIcon/>} onClick={PokerUser.signIn}>
            Login
          </Button>
        </React.Fragment>
      );
    }
  }
}