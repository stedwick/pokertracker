import React from "react";
import {onAuthStateChanged, signInWithRedirect, signOut} from "firebase/auth";
import {auth, authGoogle, db} from "./firebase";
import {Button, Avatar} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PokerMenu from "./PokerMenu";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";


export class PokerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myUser: null,
                  menuIsOpen: false,
                  menuAnchor: null
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({myUser: user});
        // window.user = user;
        this.setFirestoreUser(user);
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
  setFirestoreUser = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: Timestamp.now()
      }, {merge: true});
      const docRef = await getDoc(doc(db, "users", user.uid));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  openMenu = (event) => {
    this.setState({menuIsOpen: true});
    this.setState({menuAnchor: event.currentTarget});
  }
  closeMenu = () => {
    this.setState({menuIsOpen: false});
  }

  render() {
    const myUser = this.state.myUser;
    const menuIsOpen = this.state.menuIsOpen;
    const menuAnchor = this.state.menuAnchor;

    if (myUser) {
      return (
        <React.Fragment>
          <Button onClick={this.openMenu}>
            <Avatar alt={myUser.email} src={myUser.photoURL}/>
          </Button>
          <PokerMenu isOpen={menuIsOpen} anchorEl={menuAnchor} closeHandler={this.closeMenu}/>
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