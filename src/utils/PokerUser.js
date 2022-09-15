import React from "react";
import {onAuthStateChanged, signInWithRedirect, signOut} from "firebase/auth";
import {auth, authGoogle} from "./firebase";

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
        <p>Welcome {this.state.myUser.email}!</p>
      );
    } else {
      return (
        <p>Anonymous.</p>
      );
    }
  }
}