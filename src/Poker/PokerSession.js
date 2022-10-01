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
const dayjs = require("dayjs");

export class PokerSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({ expanded: !Boolean(prevState.expanded) }));
  };

  render() {
    const location = this.props.pokerSession.location;
    const pokerSession = this.props.pokerSession;
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
          &nbsp;
        </React.Fragment>
      );
    }

    return (
      <Accordion expanded={this.state.expanded}>
        {/* Custom CSS in index.html */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={this.toggleExpanded}
          className="minWidth"
        >
          <Box display="flex" sx={{ flexDirection: "column", minWidth: 0 }}>
            <Box display="flex">
              {/* line 1 */}
              {sessionIcon}
              <Typography
                color="error"
                sx={{ fontWeight: "bold" }}
                visibility={
                  Boolean(pokerSession.endDateTime) ? "hidden" : "visible"
                }
              >
                &nbsp;•&nbsp;
              </Typography>
              {isNew}
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
              <Box display="flex" color="text.secondary" sx={{ mt: 0.5 }}>
                <Typography noWrap variant="body2" sx={{ minWidth: 0 }}>
                  {pokerSession.notes}
                </Typography>
              </Box>
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <PokerSessionForm
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
