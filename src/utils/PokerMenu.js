import * as React from "react";
import { useState, useContext } from "react";
import currency from "currency.js";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import EmailIcon from "@mui/icons-material/Email";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import { PokerUserContext } from "../layout/userState";
import { PokerSessionsContext } from "../Poker/PokerSessionsState";
import { CSVLink, CSVDownload } from "react-csv";
import dayjs from "dayjs";

function ExportCSV(props) {
  const { pokerSessions } = useContext(PokerSessionsContext);
  const csvData = [];
  pokerSessions.forEach((pSess) => {
    // debugger;
    csvData.push({
      stakes: String(pSess.stakes) || null,
      buyIn: Number(currency(pSess.buyIn).value) || null,
      cashOut: Number(currency(pSess.cashOut).value) || null,
      startDateTime: pSess.startDateTime
        ? dayjs(pSess.startDateTime).format()
        : null,
      endDateTime: pSess.endDateTime ? dayjs(pSess.endDateTime).format() : null,
      game: String(pSess.game) || null,
      location: String(pSess.location) || null,
      notes: String(pSess.notes) || null,
      cashOrTourney: String(pSess.cashOrTourney) || null,
    });
  });
  return (
    <CSVLink
      data={csvData}
      style={{ textDecoration: "none" }}
      onClick={props.closeHandler}
      filename={`pokerSessions_${dayjs().format("YY-MM-DD")}.csv`}
    >
      {props.children}
    </CSVLink>
  );
}

export default function PokerMenu(props) {
  const { crud } = useContext(PokerUserContext);

  let menuProps = {
    open: props.isOpen,
    onClose: props.closeHandler,
  };
  if (Boolean(props.anchorEl)) {
    menuProps.anchorEl = props.anchorEl;
  } else {
    menuProps.anchorReference = "anchorPosition";
    menuProps.anchorPosition = { top: 0, left: 0 };
  }

  return (
    <Menu {...menuProps}>
      <MenuItem onClick={window.toggleTheme}>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText>
          <Typography>Light/Dark</Typography>
        </ListItemText>
      </MenuItem>
      <ExportCSV closeHandler={props.closeHandler}>
        <MenuItem>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography color="text.primary">Download CSV</Typography>
          </ListItemText>
        </MenuItem>
      </ExportCSV>
      <Link
        href="mailto:poker-tracker-phil@googlegroups.com"
        underline="none"
        onClick={props.closeHandler}
      >
        <MenuItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography color="text.primary">Email support</Typography>
          </ListItemText>
        </MenuItem>
      </Link>
      <Link
        href="https://philipbrocoum.com/"
        target="_blank"
        underline="none"
        onClick={props.closeHandler}
      >
        <MenuItem>
          <ListItemIcon>
            <OpenInNewIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Typography>Made by Phil</Typography>
          </ListItemText>
        </MenuItem>
      </Link>
      <Divider />
      <MenuItem onClick={crud.signOut}>
        <ListItemIcon>
          <Logout color="secondary" />
        </ListItemIcon>
        <ListItemText>
          <Typography color="secondary">Logout</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
}
