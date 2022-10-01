import * as React from "react";
import {
  Autocomplete,
  Button,
  TextField,
  Box,
  Tooltip,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import ClearIcon from "@mui/icons-material/Clear";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmDeleteSessionDialog from "../utils/ConfirmDeleteSessionDialog";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
const dayjs = require("dayjs");

class PokerSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.pokerSession.startDateTime,
      endTime: props.pokerSession.endDateTime,
      deleteDialogIsOpen: false,
      notes: props.pokerSession.notes,
      cashOrTourney: props.pokerSession.cashOrTourney,
      stakes: props.pokerSession.stakes,
      game: props.pokerSession.game,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    this.props.crud.update(formDataObj);
    this.props.closeHandler();
  };
  deleteHandler = () => {
    this.props.crud.delete(this.props.pokerSession);
  };

  onCashOrTourneyChange = (event) => {
    this.setState({ cashOrTourney: event.target.value });
  };
  onStartTimeChange = (time) => {
    this.setState({ startTime: time });
  };
  onEndTimeChange = (time) => {
    this.setState({ endTime: time });
  };
  clearStartTime = (event) => {
    event.stopPropagation();
    this.setState({ startTime: null });
  };
  clearEndTime = (event) => {
    event.stopPropagation();
    this.setState({ endTime: null });
  };
  setStartNow = (event) => {
    event.stopPropagation();
    this.setState({ startTime: dayjs() });
  };
  setEndNow = (event) => {
    event.stopPropagation();
    this.setState({ endTime: dayjs() });
  };

  render() {
    const pokerSession = this.props.pokerSession;
    let startAdornment;
    if (Boolean(this.state.startTime)) {
      startAdornment = (
        <IconButton onClick={this.clearStartTime} edge="end">
          <ClearIcon />
        </IconButton>
      );
    } else {
      startAdornment = (
        <Button
          variant="outlined"
          size="small"
          onClick={this.setStartNow}
          startIcon={<AccessTimeIcon edge="end" />}
        >
          Now
        </Button>
      );
    }
    let endAdornment;
    if (Boolean(this.state.endTime)) {
      endAdornment = (
        <IconButton onClick={this.clearEndTime} edge="end">
          <ClearIcon />
        </IconButton>
      );
    } else {
      endAdornment = (
        <Button
          variant="outlined"
          size="small"
          onClick={this.setEndNow}
          startIcon={<AccessTimeIcon />}
        >
          Now
        </Button>
      );
    }

    const autofill = this.props.autofill;

    const stakesChips = [];
    autofill.stakes.forEach((stakes) => {
      const selected = stakes === this.state.stakes;
      stakesChips.push(
        <Chip
          key={stakes}
          label={stakes}
          variant={selected ? "filled" : "outlined"}
          onClick={
            selected
              ? null
              : () => {
                  this.setState({ stakes: stakes });
                }
          }
          onDelete={
            selected
              ? () => {
                  this.setState({ stakes: "" });
                }
              : null
          }
        />
      );
    });
    if (
      this.state.stakes &&
      autofill.stakes.findIndex((el) => el === this.state.stakes) === -1
    ) {
      stakesChips.unshift(
        <Chip
          key={this.state.stakes}
          label={this.state.stakes}
          icon={<FiberNewOutlinedIcon />}
          variant="filled"
          onDelete={() => {
            this.setState({ stakes: "" });
          }}
        />
      );
    }

    const gameChips = [];
    autofill.game.forEach((game) => {
      const gameAbbrev = game.replaceAll(/[^0-9A-Z]/g, "");
      const selected = game === this.state.game;
      gameChips.push(
        <Chip
          key={game}
          label={gameAbbrev}
          variant={selected ? "filled" : "outlined"}
          onClick={
            selected
              ? null
              : () => {
                  this.setState({ game: game });
                }
          }
          onDelete={
            selected
              ? () => {
                  this.setState({ game: "" });
                }
              : null
          }
        />
      );
    });
    if (
      this.state.game &&
      autofill.game.findIndex((el) => el === this.state.game) === -1
    ) {
      const gameAbbrev = this.state.game.replaceAll(/[^0-9A-Z]/g, "");
      gameChips.unshift(
        <Chip
          key={this.state.game}
          label={gameAbbrev}
          icon={<FiberNewOutlinedIcon />}
          variant="filled"
          onDelete={() => {
            this.setState({ game: "" });
          }}
        />
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="id" value={pokerSession.id} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Autocomplete
            sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
            freeSolo
            options={autofill.stakes}
            inputValue={this.state.stakes}
            onInputChange={(e, v) => this.setState({ stakes: v })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Stakes"
                name="stakes"
                autoComplete="off"
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              order: { sm: 4 },
            }}
          >
            {stakesChips}
          </Box>
          <NumericFormat
            sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
            prefix="$"
            thousandSeparator=","
            customInput={TextField}
            label="Buy-in"
            name="buyIn"
            value={pokerSession.buyIn}
            autoComplete="off"
            type="tel" // sigh
            inputMode="decimal"
            pattern="[0-9.,$€£]*"
          />
          <NumericFormat
            sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
            prefix="$"
            thousandSeparator=","
            customInput={TextField}
            label="Cash-out"
            name="cashOut"
            value={pokerSession.cashOut}
            autoComplete="off"
            type="tel" // sigh
            inputMode="decimal"
            pattern="[0-9.,$€£]*"
          />
        </Box>
        <br />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              value={
                Boolean(this.state.startTime) ? this.state.startTime : null
              }
              renderInput={(props) => (
                <TextField
                  name="startDateTime"
                  autoComplete="off"
                  sx={{
                    flex: { sm: 1 },
                    flexBasis: { xs: "100%", sm: undefined },
                  }}
                  {...props}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {startAdornment}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              label="Start time"
              onChange={this.onStartTimeChange}
            />
            <MobileDateTimePicker
              value={Boolean(this.state.endTime) ? this.state.endTime : null}
              renderInput={(props) => (
                <TextField
                  name="endDateTime"
                  autoComplete="off"
                  sx={{
                    flex: { sm: 1 },
                    flexBasis: { xs: "100%", sm: undefined },
                  }}
                  {...props}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {endAdornment}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              label="End time"
              onChange={this.onEndTimeChange}
            />
          </LocalizationProvider>
        </Box>
        <br />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Autocomplete
            sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
            freeSolo
            options={autofill.game}
            inputValue={this.state.game}
            onInputChange={(e, v) => this.setState({ game: v })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Game"
                name="game"
                autoComplete="off"
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              order: { sm: 4 },
            }}
          >
            {gameChips}
          </Box>
          <Autocomplete
            sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
            freeSolo
            value={pokerSession.location}
            options={autofill.location}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                name="location"
                autoComplete="off"
              />
            )}
          />

          <TextField
            sx={{ flex: 1 }}
            label="Notes"
            name="notes"
            value={this.state.notes}
            onChange={(event) => this.setState({ notes: event.target.value })}
            autoComplete="off"
          />
        </Box>

        <RadioGroup
          value={this.state.cashOrTourney}
          onChange={this.onCashOrTourneyChange}
          name="cashOrTourney"
          sx={{ flexDirection: "row", marginTop: 1, marginBottom: 1 }}
        >
          <FormControlLabel
            value="cashGame"
            control={<Radio />}
            label="Cash"
          />
          <FormControlLabel
            value="tournament"
            control={<Radio />}
            label="Tournament"
          />
        </RadioGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              startIcon={<SaveIcon />}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          </Box>
          <Tooltip title="Delete">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                this.setState({ deleteDialogIsOpen: true });
              }}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Box>
        <ConfirmDeleteSessionDialog
          open={this.state.deleteDialogIsOpen}
          pokerSession={pokerSession}
          handleClose={() => {
            this.setState({ deleteDialogIsOpen: false });
          }}
          handleDelete={this.deleteHandler}
        />
      </form>
    );
  }
}

export default PokerSessionForm;
