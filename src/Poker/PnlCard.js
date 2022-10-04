import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Popover,
  TextField,
  Container,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import { PokerSessionsContext } from "./PokerSessionsState";
import { NumericFormat } from "react-number-format";
import currency from "currency.js";

export class PnlCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initRoll: 999839,
    };
  }

  handleInitRoll = (money) => {
    this.setState({ initRoll: money });
  };

  render() {
    const { crud, pokerSessions } = this.context;
    const balance = crud
      .calcTotalProfit(pokerSessions)
      .add(this.state.initRoll);
    let color = "text.primary";
    const rounded = Number(currency(balance, { precision: 0 }).value);
    if (rounded > 0) {
      color = "success.main";
    } else if (rounded < 0) {
      color = "error.main";
    }

    return (
      <Card>
        <CardContent sx={{ position: "relative" }}>
          <BankrollPopover
            money={this.state.initRoll}
            handler={this.handleInitRoll}
          />
          <Typography
            variant="h6"
            sx={{ color: "text.disabled", position: "absolute" }}
          >
            <AccountBalanceIcon sx={{ verticalAlign: "sub" }} />
          </Typography>
          <Typography variant="h6" align="center">
            Bankroll
          </Typography>
          <Typography variant="h4" align="center" sx={{ color: color }}>
            {currency(balance, { precision: 0 }).format()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
PnlCard.contextType = PokerSessionsContext;

function BankrollPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData);
    props.handler(formDataObj.initRoll);
    handleClose();
  };

  return (
    <>
      <Box sx={{ position: "absolute", right: "0", marginRight: 2 }}>
        <IconButton
          // sx={(theme) => (
          //   theme.palette.mode === "light"
          //     ? {
          //         border: 1,
          //         borderRadius: 2,
          //         // color: "#9c27b0",
          //         color: "primary.main"
          //       }
          //     : {
          //         border: 1,
          //         borderRadius: 2,
          //         color: "primary.main"
          //       }
          // )}
          sx={{
            border: 1,
            borderRadius: 2,
          }}
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleClick}
          disableRipple
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Container sx={{ py: 2 }}>
          <form onSubmit={handleSubmit}>
            <NumericFormat
              sx={{ flex: { sm: 1 }, flexBasis: { xs: "100%", sm: undefined } }}
              prefix="$"
              thousandSeparator=","
              customInput={TextField}
              // customInput={props => <TextField inputRef={el=>inputEl=el} {...props} autoFocus />}
              label="Initial Bankroll"
              name="initRoll"
              value={props.money}
              autoComplete="off"
              type="tel" // sigh
              inputMode="decimal"
              pattern="[0-9.,$€£]*"
              autoFocus
            />
          </form>
        </Container>
      </Popover>
    </>
  );
}
