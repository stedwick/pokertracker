import * as React from "react";
const dayjs = require("dayjs");

const PokerSessionsContext = React.createContext({ values: [] });

function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

export class PokerSessionsState extends React.Component {
  constructor(props) {
    super(props);
    const idGen = idMaker();
    const nowDateTime = dayjs();
    const pokerSessions = [
      {
        id: idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime.subtract(80, "hour"),
        stakes: "1/3",
        buyIn: 500,
        cashOut: 700,
        startDateTime: nowDateTime.subtract(80, "hour"),
        endDateTime: nowDateTime.subtract(78, "hour"),
        location: "Wynn",
        game: "No-Limit Hold'em",
        notes: "🍹 Tasty watermelon juice",
        cashOrTourney: "cashGame",
      },
      {
        id: idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime.subtract(56, "hour"),
        stakes: "",
        buyIn: 1000,
        cashOut: 0,
        startDateTime: nowDateTime.subtract(56, "hour"),
        endDateTime: nowDateTime.subtract(52, "hour"),
        location: "Aria",
        game: "Pot-Limit Omaha",
        notes: "",
        cashOrTourney: "tournament",
      },
      {
        id: idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime.subtract(32, "hour"),
        stakes: "20",
        buyIn: 20,
        cashOut: 30.75,
        startDateTime: nowDateTime.subtract(100, "hour"),
        endDateTime: nowDateTime.subtract(92, "hour"),
        location: "IgnitionCasino.eu",
        game: "No-Limit Hold'em",
        notes: "",
        cashOrTourney: "cashGame",
      },
      {
        id: idGen.next().value,
        createdAt: nowDateTime,
        sortDateTime: nowDateTime.subtract(32, "hour"),
        stakes: "2/5",
        buyIn: 1000,
        cashOut: 1950,
        startDateTime: nowDateTime.subtract(32, "hour"),
        endDateTime: nowDateTime.subtract(25, "hour"),
        location: "Ballys",
        game: "No-Limit Hold'em",
        notes: "",
        cashOrTourney: "cashGame",
      },
    ];
    this.sortPokerSessions(pokerSessions);
    this.state = {
      idGen: idGen,
      pokerSessions: pokerSessions,
    };
  }

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
      <PokerSessionsContext.Provider
        value={{
          values: this.state.pokerSessions,
          crud: {
            create: this.addPokerSession,
            update: this.updatePokerSession,
            delete: this.deletePokerSession,
          },
        }}
      >
        {this.props.children}
      </PokerSessionsContext.Provider>
    );
  }
}

export default PokerSessionsState;
export { PokerSessionsContext };
