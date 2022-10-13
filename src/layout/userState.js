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
      pokerUser: demoUser,
      crud: {
        updateBankroll: this.updateBankroll,
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (this.userHasChanged) return;
      this.userHasChanged = true;
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({ pokerUser: user }, () => {
          this.userHasChanged = false;
        });
        // window.myUser = user;
        this.setFirestoreUser(user.uid, {
          email: user.email,
          updatedAt: Timestamp.now(),
        });
      } else {
        // User is signed out
        this.setState({ pokerUser: demoUser }, () => {
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
    this.setState({pokerUser: {bankrollAdjustment: newRoll}});
    // this.setFirestoreUser(uid, {
    //   bankrollAdjustment: Number(currency(newRoll, { precision: 2 }).format()),
    // })
    //   .then(() => {})
    //   .catch(() => {})
    //   .finally(() => {});
  };

  setFirestoreUser = async (uid, userFields) => {
    try {
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, userFields, { merge: true });
      const docSnap = await getDoc(docRef);
      console.log(
        "(setFirestoreUser) Firestore setDoc written:",
        docSnap.id,
        docSnap.data()
      );
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
