import * as React from 'react';
import {Autocomplete, Button, TextField, Box, Tooltip,
  FormControlLabel, RadioGroup, Radio} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
const dayjs = require('dayjs')


class PokerSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: dayjs(),
      endTime: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert('A form was submitted: ' + JSON.stringify(Object.fromEntries(formData)));
    this.props.closeHandler();
  }

  onStartTimeChange = (time) => {
    this.setState({startTime: time});
  }
  onEndTimeChange = (time) => {
    this.setState({endTime: time});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            sx={{flex: 1}}
            freeSolo
            value="1/2"
            options={['1/2', '1/3', '2/5'].sort()}
            renderInput={(params) =>
              <TextField {...params} label="Stakes" name='stakes' />}
          />
          <NumericFormat sx={{flex: 2}} prefix='$' thousandSeparator="," customInput={TextField}
                         label='Buy-in' name='buyIn' value={12323} />
          <NumericFormat sx={{flex: 2}} prefix='$' thousandSeparator="," customInput={TextField}
                         label='Cash-out' name='cashOut' />
        </Box>
        <br/>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={this.state.startTime}
              renderInput={(props) =>
                <TextField name='startDateTime' sx={{flex: 1}} {...props} />}
              label="Start time"
              onChange={this.onStartTimeChange}
            />
            <DateTimePicker
              value={this.state.endTime}
              renderInput={(props) =>
                <TextField name='endDateTime' sx={{flex: 1}} {...props} />}
              label="End time"
              onChange={this.onEndTimeChange}
            />
          </LocalizationProvider>
        </Box>
        <br/>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            sx={{flex: 1}}
            freeSolo
            value="Mirage"
            options={['Mirage', 'Wynn', 'Aria'].sort()}
            renderInput={(params) =>
              <TextField {...params} label="Location" name='location' />}
          />
          <TextField sx={{flex: 1}} label='Notes' name='notes' />
        </Box>

        <RadioGroup defaultValue="cashGame" name="cashOrTourney"
                    sx={{ flexDirection: 'row', marginTop: 1, marginBottom: 1}}>
          <FormControlLabel value="cashGame" control={<Radio />} label="Cash game" />
          <FormControlLabel value="tournament" control={<Radio />} label="Tournament" />
        </RadioGroup>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" startIcon={<SaveIcon/>} variant="contained" color='success'>Update</Button>
            <Tooltip title="Cancel">
              <Button variant="outlined" color='primary' onClick={this.props.closeHandler}><CancelIcon/></Button>
            </Tooltip>
          </Box>
          <Tooltip title="Delete">
            <Button variant="outlined" color='error' onClick={this.props.closeHandler}><DeleteIcon/></Button>
          </Tooltip>
        </Box>
      </form>
    );
  }
}

export default PokerSessionForm;