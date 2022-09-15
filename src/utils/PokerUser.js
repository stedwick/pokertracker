import React from "react";
import {onAuthStateChanged, signInWithRedirect, signOut} from "firebase/auth";
import {auth, authGoogle} from "./firebase";
import Button from "@mui/material/Button";
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
          <p>Welcome {this.state.myUser.email}!</p>
          <p>
            <Button variant="outlined" color="secondary" endIcon={<LogoutIcon/>} onClick={PokerUser.signOut}>
              Logout
            </Button>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Anonymous.</p>
          <p>
            <Button variant="contained" startIcon={<LoginIcon/>} onClick={PokerUser.signIn}>
              Login
            </Button>
          </p>
        </div>
      );
    }
  }
}