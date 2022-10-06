// // @ts-check

import * as React from "react";

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PokerSessionForm from "./PokerSessionForm";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { orange } from "@mui/material/colors";
import currency from "currency.js";
// window.currency = currency;
const dayjs = require("dayjs");

class PokerSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpanded = () => {
    this.setState(
      (prevState) => ({ expanded: !Boolean(prevState.expanded) }),
      () => {
        this.props.setKey(this.props.pokerSession.id);
      }
    );
  };

  render() {
    const location = this.props.pokerSession.location;
    const pokerSession = this.props.pokerSession;
    const crud = this.props.crud;

    let sessionIcon;
    if (pokerSession.cashOrTourney === "cashGame") {
      sessionIcon = <LocalAtmOutlinedIcon />;
      // sessionIcon = <PaidOutlinedIcon />
    } else {
      sessionIcon = <EmojiEventsOutlinedIcon />;
    }

    let isNew = false;
    if (pokerSession.isNew) {
      isNew = (
        <React.Fragment>
          <FiberNewIcon sx={{ color: orange[500] }} />
        </React.Fragment>
      );
    }

    let profit = crud.calcSessionProfit(pokerSession);
    let profitEl = false;
    let AccordionSummaryBgColor = false;
    if (crud.sessionIsFinished(pokerSession)) {
      let color, plusOrMinus;
      if (profit > 0) {
        color = "success.main";
        plusOrMinus = "+";
        AccordionSummaryBgColor = "#EEFFEE";
      } else if (profit < 0) {
        color = "error.main";
        AccordionSummaryBgColor = "#FFEEEE";
        // plusOrMinus = '-';
      } else {
      }
      profitEl = (
        <Typography sx={{ color: color }}>
          {plusOrMinus}
          {currency(profit, { precision: 0 }).format()}
        </Typography>
      );
    }

    let myBorder = null;
    if (this.props.currentKey === pokerSession.id && !this.state.expanded) {
      myBorder = { border: 1, borderColor: "primary.main" };
    }

    return (
      <Accordion
        expanded={this.state.expanded}
        TransitionProps={{ unmountOnExit: true }}
        sx={myBorder}
        // onChange={()=>{
        //   this.props.setKey(pokerSession.id);
        // }}
      >
        {/* Custom CSS in index.html */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={this.toggleExpanded}
          className="minWidth"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? AccordionSummaryBgColor
                : undefined,
          }}
        >
          <Box display="flex" sx={{ flexDirection: "column", minWidth: 0 }}>
            <Box display="flex" sx={{ gap: 1 }}>
              {/* line 1 */}
              {sessionIcon}
              <Typography
                color="error"
                sx={{ fontWeight: "bold", transform: "scale(2)" }}
                display={Boolean(pokerSession.endDateTime) ? "none" : undefined}
              >
                •
              </Typography>
              {isNew}
              {profitEl}
              <Typography noWrap sx={{ minWidth: 0 }}>
                {location}
              </Typography>
            </Box>

            <Box
              display="flex"
              color="text.secondary"
              sx={{ gap: 1, mt: 0.5, alignItems: "center", flexWrap: "wrap" }}
            >
              {/* Line 2 */}
              {dayjs(pokerSession.startDateTime).isValid() && (
                <Typography variant="body2">
                  {dayjs().isSame(dayjs(pokerSession.startDateTime), "year")
                    ? dayjs(pokerSession.startDateTime).format("MMM D")
                    : dayjs(pokerSession.startDateTime).format("MMM D, 'YY")}
                </Typography>
              )}
              {pokerSession.stakes && (
                <Typography variant="body2">{pokerSession.stakes}</Typography>
              )}
              {pokerSession.game && (
                <Typography variant="body2">
                  {pokerSession.game.replaceAll(/[^0-9A-Z]/g, "")}
                </Typography>
              )}
            </Box>
            {pokerSession.notes && (
              <Box display="flex" sx={{ mt: 0.5 }}>
                <Typography noWrap variant="body2" sx={{ minWidth: 0 }}>
                  {pokerSession.notes}
                </Typography>
              </Box>
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <PokerSessionForm
            // key={this.props.pokerSession.key || undefined}
            pokerSession={this.props.pokerSession}
            closeHandler={this.toggleExpanded}
            crud={this.props.crud}
            autofill={this.props.autofill}
          />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default PokerSession;
