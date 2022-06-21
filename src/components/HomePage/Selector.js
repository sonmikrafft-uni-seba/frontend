import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@material-ui/styles';
export default function Selector() {
  const [accountID, setAccountID] = React.useState('');
  const theme = useTheme();
  const handleChange = (event) => {
    setAccountID(event.target.value);
  };
  return (
    <Box sx={{ mx: 'auto', width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="account-select-label">Account to visualise</InputLabel>
        <Select
          labelId="account-select-label"
          id="account-select"
          value={accountID}
          label="Account to visualise"
          onChange={handleChange}
          color="primary"
        >
          <MenuItem value={0}>All Accounts</MenuItem>
          <MenuItem value={1}>Account 1</MenuItem>
          <MenuItem value={2}>Account 2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
