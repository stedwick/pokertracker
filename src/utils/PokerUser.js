import React from "react";
import {onAuthStateChanged, signInWithRedirect, signOut} from "firebase/auth";
import {auth, authGoogle} from "./firebase";
import {Button, IconButton, Avatar, Box} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export class PokerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myUser: null};
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

  render() {
    if (this.state.myUser) {
      return (
        <div>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Avatar alt={this.state.myUser.email} src={this.state.myUser.photoURL} />
            &nbsp;
            <IconButton variant="outlined" color="secondary" onClick={PokerUser.signOut}>
              <LogoutIcon/>
            </IconButton>
          </Box>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="contained" startIcon={<LoginIcon/>} onClick={PokerUser.signIn}>
            Login
          </Button>
        </div>
      );
    }
  }
}