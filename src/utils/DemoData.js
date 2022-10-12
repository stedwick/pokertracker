
const dayjs = require("dayjs");
const nowDateTime = dayjs();

function* idMaker() {
  let index = 1;
  while (true) {
    yield index++;
  }
}
const idGen = idMaker();

const demoData = [
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
  {
    id: idGen.next().value,
    createdAt: nowDateTime,
    stakes: "1/2",
    buyIn: 420,
    startDateTime: nowDateTime.subtract(1, "hour"),
    location: "Portland Meadows",
    game: "No-Limit Hold'em",
    notes: "",
    cashOrTourney: "cashGame",
  },
];

const demoBankroll = 1000259;

export default demoData;
export {idGen, demoBankroll};