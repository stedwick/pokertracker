import * as React from "react";
import currency from "currency.js";
import demoData, { idGen } from "../utils/DemoData.js";
// import philData from "../utils/PhilData.js";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
// window.currency = currency;
const dayjs = require("dayjs");

const PokerSessionsContext = React.createContext({ values: [] });

export class PokerSessionsState extends React.Component {
  constructor(props) {
    super(props);
    const pokerSessions = demoData;
    // const pokerSessions = philData;
    this.sortPokerSessions(pokerSessions);
    this.state = {
      // firestoreUser: props.firestoreUser,
      idGen: idGen,
      pokerSessions: pokerSessions,
      crud: {
        create: this.addPokerSession,
        update: this.updatePokerSession,
        delete: this.deletePokerSession,
        calcSessionProfit: this.calcSessionProfit,
        calcTotalProfit: this.calcTotalProfit,
        sessionIsFinished: this.sessionIsFinished,
      },
    };
  }

  componentDidMount() {
    console.log("Mounted");
    this.fetchSessions();
  }

  sessionIsFinished = (pokerSession) => {
    return (
      ((pokerSession.cashOut || pokerSession.cashOut === 0) &&
        (pokerSession.buyIn || pokerSession.buyIn === 0)) ||
      pokerSession.endDateTime
    );
  };

  calcTotalProfit = (pokerSessions) => {
    return pokerSessions.reduce((sum, pSess) => {
      sum = sum.add(this.calcSessionProfit(pSess, true));
      // console.log(`Sessions profit: ${this.calcSessionProfit(pSess).format()} ... Running total: ${sum.format()}`);
      return sum;
    }, currency());
  };

  calcSessionProfit = (pokerSession, whileRunning = false) => {
    let profit = currency();
    if (this.sessionIsFinished(pokerSession) || whileRunning) {
      profit = profit.add(pokerSession.cashOut).subtract(pokerSession.buyIn);
      // console.log(`${pokerSession.cashOut} - ${pokerSession.buyIn} = ${profit.format()}`);
    }
    return profit;
  };

  sortPokerSessions = (pSess) => {
    pSess.sort((a, b) => {
      return (
        dayjs(b.startDateTime || b.endDateTime || b.id) -
        dayjs(a.startDateTime || a.endDateTime || a.id)
      );
    });
  };

  updatePokerSession = (updatedPokerSession, opts = { sync: true }) => {
    // debugger;
    this.setState((prevState) => {
      const prevPokerSessions = prevState.pokerSessions;
      const index = prevPokerSessions.findIndex(
        (pSess) => String(pSess.id) === String(updatedPokerSession.id)
      );
      if (index !== -1) {
        const prevPokerSession = prevPokerSessions[index];

        if (
          updatedPokerSession.cashOut &&
          !prevPokerSession.cashOut &&
          !updatedPokerSession.endDateTime &&
          !prevPokerSession.endDateTime
        ) {
          updatedPokerSession.endDateTime = dayjs();
          // updatedPokerSession.key = dayjs().unix();
        }
        if (
          updatedPokerSession.endDateTime &&
          !prevPokerSession.endDateTime &&
          !updatedPokerSession.cashOut &&
          !prevPokerSession.cashOut
        ) {
          updatedPokerSession.cashOut = 0;
          // updatedPokerSession.key = dayjs().unix();
        }

        const newPokerSession = { ...prevPokerSession, ...updatedPokerSession };
        if (opts.sync && newPokerSession.firestoreId)
          delete newPokerSession.isNew;
        const newPokerSessions = prevPokerSessions;
        newPokerSessions.splice(index, 1, newPokerSession);
        this.sortPokerSessions(newPokerSessions);
        // debugger;
        if (opts.sync && newPokerSession.firestoreId) {
          this.syncSession(newPokerSession);
        }
        return { pokerSessions: newPokerSessions };
      } else {
        return null;
      }
    });
  };

  addPokerSession = () => {
    // debugger;
    const nowDateTime = dayjs();
    let newSession;
    if (this.state.pokerSessions.length > 0) {
      const clonedSession = { ...this.state.pokerSessions[0] };
      delete clonedSession.firestoreId;
      const blankSession = {
        id: this.state.idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime,
        cashOut: "",
        startDateTime: nowDateTime,
        endDateTime: "",
        notes: "",
      };
      newSession = { ...clonedSession, ...blankSession };
    } else {
      newSession = {
        id: this.state.idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime,
        stakes: "1/2",
        buyIn: 400,
        cashOut: "",
        startDateTime: nowDateTime,
        endDateTime: "",
        location: "My Local Poker Room",
        game: "No-Limit Hold'em",
        notes: "🃏 Let's run good!",
        cashOrTourney: "cashGame",
      };
    }
    newSession.isNew = true;
    this.setState(
      (prevState) => ({
        pokerSessions: [newSession, ...prevState.pokerSessions],
      }),
      () => {
        // debugger;
        this.syncSession(newSession);
      }
    );
  };

  fetchSessions = async () => {
    console.log('fetchSessions.');
    console.log(this.props.firestoreUser?.uid);
    if (!this.props.firestoreUser?.uid) return false;
    try {
      const docRef = doc(db, "users", this.props.firestoreUser.uid);
      const colRef = collection(docRef, "pokerSessions");
      const querySnapshot = await getDocs(colRef);
      const newPokerSessions = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        newPokerSessions.push(doc.data());
      });
      this.sortPokerSessions(newPokerSessions);
      this.setState({
        pokerSessions: [newPokerSessions],
      });
    } catch (e) {
      console.error("(fetchSessions)", e);
      alert("Could not connect to the Internet. Refreshing.");
      window.location.reload();
      return false;
    }
  };

  syncSession = async (pSess, opts = { delete: false }) => {
    // console.log(this.props);
    // debugger;
    if (!this.props.firestoreUser?.uid) return null;

    try {
      const objToSync = {
        stakes: String(pSess.stakes) || null,
        buyIn: Number(currency(pSess.buyIn).value) || null,
        cashOut: Number(currency(pSess.cashOut).value) || null,
        startDateTime: pSess.startDateTime
          ? Timestamp.fromDate(dayjs(pSess.startDateTime).toDate())
          : null,
        endDateTime: pSess.endDateTime
          ? Timestamp.fromDate(dayjs(pSess.endDateTime).toDate())
          : null,
        game: String(pSess.game) || null,
        location: String(pSess.location) || null,
        notes: String(pSess.notes) || null,
        cashOrTourney: String(pSess.cashOrTourney) || null,
      };

      const docRef = doc(db, "users", this.props.firestoreUser.uid);
      const colRef = collection(docRef, "pokerSessions");

      if (pSess.firestoreId) {
        const docRefWithId = doc(
          db,
          "users",
          this.props.firestoreUser.uid,
          "pokerSessions",
          pSess.firestoreId
        );
        if (opts.delete) {
          await deleteDoc(docRefWithId);
          return true;
        }
        const docSnap = await getDoc(docRefWithId);
        if (docSnap.exists()) {
          await setDoc(docRefWithId, objToSync, { merge: true });
          // const docSnap = await getDoc(docRef);
          // const docData = docSnap.data();
          // debugger;
          console.log("Updating pSess:", docRefWithId.path);
          // this.updatePokerSession(docData);
          return true;
        }
      }

      const newDocRef = await addDoc(colRef, objToSync);
      pSess.firestoreId = newDocRef.id;
      this.updatePokerSession(pSess, { sync: false });
      // const docSnap = await getDoc(docRef);
      // const docData = docSnap.data();
      console.log("Creating pSess:", newDocRef.path);
      // return docData;
      return true;
    } catch (e) {
      console.error("(syncSession)", e);
      alert("Could not connect to the Internet. Refreshing.");
      window.location.reload();
      return false;
    }
  };

  deletePokerSession = (pokerSession) => {
    // alert("deleting");
    const pSessIndex = this.state.pokerSessions.findIndex(
      (pSess) => pSess.id === pokerSession.id
    );
    if (pSessIndex > -1) {
      this.setState(
        (prevState) => {
          let splicedPokerSessions = [...prevState.pokerSessions];
          splicedPokerSessions.splice(pSessIndex, 1);
          return { pokerSessions: splicedPokerSessions };
        },
        () => {
          if (pokerSession.firestoreId)
            this.syncSession(pokerSession, { delete: true });
        }
      );
    }
  };

  render() {
    return (
      <PokerSessionsContext.Provider value={this.state}>
        {this.props.children}
      </PokerSessionsContext.Provider>
    );
  }
}

export default PokerSessionsState;
export { PokerSessionsContext };
