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
    this.setState({initRoll: money});
  };

  render() {
    const { crud, pokerSessions } = this.context;
    const balance = crud
      .calcTotalProfit(pokerSessions)
      .add(this.state.initRoll);

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
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "success.main" }}
          >
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
          sx={{ borderColor: "primary.main", border: 1, borderRadius: 2 }}
          color="secondary"
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
              label="Initial Bankroll"
              name="initRoll"
              value={props.money}
              autoComplete="off"
              type="tel" // sigh
              inputMode="decimal"
              pattern="[0-9.,$€£]*"
            />
          </form>
        </Container>
      </Popover>
    </>
  );
}
