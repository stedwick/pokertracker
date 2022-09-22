import * as React from 'react';
import {Autocomplete, Button, TextField, Box, Tooltip,
  FormControlLabel, RadioGroup, Radio, InputAdornment, IconButton} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import ClearIcon from '@mui/icons-material/Clear';


class PokerSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.valuesObj.startDateTime,
      endTime: props.valuesObj.endDateTime
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    alert('A form was submitted: ' + JSON.stringify(formDataObj, null, 2));
    this.props.closeHandler();
  }

  onStartTimeChange = (time) => {
    this.setState({startTime: time});
  }
  onEndTimeChange = (time) => {
    this.setState({endTime: time});
  }
  clearStartTime = (event) => {
    event.stopPropagation();
    this.setState({startTime: null});
  }
  clearEndTime = (event) => {
    event.stopPropagation();
    this.setState({endTime: null});
  }

  render() {
    const valuesObj = this.props.valuesObj;
    return (
      <form onSubmit={this.handleSubmit}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Autocomplete
            sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}}
            freeSolo
            value={valuesObj.stakes}
            options={['1/2', '1/3', '2/5'].sort()}
            renderInput={(params) =>
              <TextField {...params} label="Stakes" name='stakes' />}
          />
          <NumericFormat sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}}
                         prefix='$' thousandSeparator="," customInput={TextField}
                         label='Buy-in' name='buyIn' value={valuesObj.buyIn} autoComplete='off'
                         type='tel' // sigh
                         inputMode='decimal' pattern='[0-9.,$€£]*' />
          <NumericFormat sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}}
                         prefix='$' thousandSeparator="," customInput={TextField}
                         label='Cash-out' name='cashOut' value={valuesObj.cashOut} autoComplete='off'
                         type='tel' // sigh
                         inputMode='decimal' pattern='[0-9.,$€£]*' />
        </Box>
        <br/>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={Boolean(this.state.startTime) ? this.state.startTime : null}
              renderInput={(props) =>
                <TextField name='startDateTime'
                           sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}} {...props}
                           InputProps={{endAdornment:
                               <InputAdornment position="end">
                                 <IconButton
                                   onClick={this.clearStartTime}
                                   edge="end">
                                   <ClearIcon />
                                 </IconButton>
                               </InputAdornment>
                           }}
                />

              }
              label="Start time"
              onChange={this.onStartTimeChange}
            />
            <DateTimePicker
              value={Boolean(this.state.endTime) ? this.state.endTime : null}
              renderInput={(props) =>
                <TextField name='endDateTime'
                           sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}} {...props}
                           InputProps={{endAdornment:
                               <InputAdornment position="end">
                                 <IconButton
                                   onClick={this.clearEndTime}
                                   edge="end">
                                   <ClearIcon />
                                 </IconButton>
                               </InputAdornment>
                           }}
                />}
              label="End time"
              onChange={this.onEndTimeChange}
            />
          </LocalizationProvider>
        </Box>
        <br/>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Autocomplete
            sx={{flex: {sm: 1}, flexBasis: {xs: '100%', sm: undefined}}}
            freeSolo
            value={valuesObj.location}
            options={['Mirage', 'Wynn', 'Aria'].sort()}
            renderInput={(params) =>
              <TextField {...params} label="Location" name='location' />}
          />
          <TextField sx={{flex: 1}} label='Notes' name='notes' value={valuesObj.notes} />
        </Box>

        <RadioGroup defaultValue={valuesObj.cashOrTourney} name="cashOrTourney"
                    sx={{ flexDirection: 'row', marginTop: 1, marginBottom: 1}}>
          <FormControlLabel value="cashGame" control={<Radio />} label="Cash game" />
          <FormControlLabel value="tournament" control={<Radio />} label="Tournament" />
        </RadioGroup>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" startIcon={<SaveIcon/>} variant="contained" color='success'>Update</Button>
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