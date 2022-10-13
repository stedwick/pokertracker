import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db, auth, authGoogle } from "../utils/firebase";
import { onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { demoBankroll } from "../utils/DemoData.js";
import * as React from "react";
import { Container, Typography } from "@mui/material";
import currency from "currency.js";
import InfoIcon from "@mui/icons-material/Info";

const PokerUserContext = React.createContext(null);

const demoUser = {
  uid: null,
  demo: true,
  bankrollAdjustment: demoBankroll,
};

export class PokerUserState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firestoreUser: null,
      pokerUser: demoUser,
      crud: {
        updateBankroll: this.updateBankroll,
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      if (this.userHasChanged) return;
      this.userHasChanged = true;
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // window.myUser = user;
        this.setState({ firestoreUser: user });
        const userObj = await this.setFirestoreUser(user.uid, {
          idFirestore: user.uid,
          email: user.email,
          updatedAt: Timestamp.now(),
        });
        this.setState({ pokerUser: userObj }, () => {
          this.userHasChanged = false;
        });
      } else {
        // User is signed out
        this.setState({ pokerUser: demoUser, firestoreUser: null }, () => {
          this.userHasChanged = false;
        });
      }
    });
  }

  signIn = () => {
    signInWithRedirect(auth, authGoogle);
  };
  signOut = () => {
    signOut(auth);
  };

  updateBankroll = (newRoll) => {
    if (this.state.firestoreUser?.uid) {
      const newRollNum = Number(currency(newRoll, { precision: 2 }).value);
      this.setFirestoreUser(this.state.firestoreUser.uid, {
        bankrollAdjustment: newRollNum,
      })
        .then(() => {
          this.setState((prevState) => ({
            pokerUser: { ...prevState.pokerUser, bankrollAdjustment: newRollNum },
          }));
        })
        .catch(() => {})
        .finally(() => {});
    } else {
      this.setState((prevState) => ({
        pokerUser: { ...prevState.pokerUser, bankrollAdjustment: newRoll },
      }));
    }
  };

  setFirestoreUser = async (uid, userFields) => {
    try {
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, userFields, { merge: true });
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      console.log(
        "(setFirestoreUser) Firestore setDoc written:",
        docSnap.id,
        docData
      );
      return docData;
    } catch (e) {
      console.error("(setFirestoreUser) Firestore setDoc error:", e);
    }
  };

  render() {
    return (
      <PokerUserContext.Provider value={this.state}>
        {this.props.children}

        {this.state.pokerUser.demo && (
          <Container>
            <Typography
              variant="body1"
              align="center"
              sx={{ mx: 2, mb: 2 }}
              color="text.secondary"
            >
              <InfoIcon fontSize="small" sx={{ verticalAlign: "sub" }} /> This
              is demo data. Sign-in with Google to track your poker profit.
            </Typography>
          </Container>
        )}
      </PokerUserContext.Provider>
    );
  }
}

export default PokerUserState;
export { PokerUserContext };
