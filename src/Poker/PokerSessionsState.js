import * as React from "react";
import currency from "currency.js";
import demoData, {idGen} from "../utils/DemoData.js";
// window.currency = currency;
const dayjs = require("dayjs");

const PokerSessionsContext = React.createContext({ values: [] });

export class PokerSessionsState extends React.Component {
  constructor(props) {
    super(props);
    const pokerSessions = demoData;
    this.sortPokerSessions(pokerSessions);
    this.state = {
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

  sessionIsFinished = (pokerSession) => {
    return (
      ((pokerSession.cashOut || pokerSession.cashOut === 0) &&
      (pokerSession.buyIn || pokerSession.buyIn === 0))
      || pokerSession.endDateTime
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

  updatePokerSession = (updatedPokerSession) => {
    this.setState((prevState) => {
      const prevPokerSessions = prevState.pokerSessions;
      const index = prevPokerSessions.findIndex(
        (pSess) => String(pSess.id) === String(updatedPokerSession.id)
      );
      if (index !== -1) {
        const prevPokerSession = prevPokerSessions.at(index);
        
        if (
          (updatedPokerSession.cashOut && !prevPokerSession.cashOut)
          && (!updatedPokerSession.endDateTime && !prevPokerSession.endDateTime)
        ) {
          updatedPokerSession.endDateTime = dayjs();
          updatedPokerSession.key = dayjs().unix();
        }
        if (
          (updatedPokerSession.endDateTime && !prevPokerSession.endDateTime)
          && (!updatedPokerSession.cashOut && !prevPokerSession.cashOut)
        ) {
          updatedPokerSession.cashOut = 0;
          updatedPokerSession.key = dayjs().unix();
        }

        const newPokerSession = { ...prevPokerSession, ...updatedPokerSession };
        delete newPokerSession.isNew;
        const newPokerSessions = prevPokerSessions;
        newPokerSessions.splice(index, 1, newPokerSession);
        this.sortPokerSessions(newPokerSessions);
        return { pokerSessions: newPokerSessions };
      } else {
        return null;
      }
    });
  };

  addPokerSession = () => {
    const nowDateTime = dayjs();
    let newSession;
    if (this.state.pokerSessions.length > 0) {
      const clonedSession = { ...this.state.pokerSessions[0] };
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
    this.setState((prevState) => ({
      pokerSessions: [newSession, ...prevState.pokerSessions],
    }));
  };

  deletePokerSession = (pokerSession) => {
    // alert("deleting");
    const pSessIndex = this.state.pokerSessions.findIndex(
      (pSess) => pSess.id === pokerSession.id
    );
    if (pSessIndex > -1) {
      this.setState((prevState) => {
        let splicedPokerSessions = [...prevState.pokerSessions];
        splicedPokerSessions.splice(pSessIndex, 1);
        return { pokerSessions: splicedPokerSessions };
      });
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
