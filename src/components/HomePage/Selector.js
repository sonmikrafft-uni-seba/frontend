import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import { Box } from '@mui/material';
import { outerTheme } from './HomePageTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
export default function Selector() {
  const [accountID, setAccountID] = React.useState(0);

  const handleChange = (event) => {
    setAccountID(event.target.value);
  };
  return (
    <ThemeProvider theme={outerTheme}>
      <Box sx={{ mx: 'auto', width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="account-select-label" sx={{ color: 'white' }}>
            Account to visualise
          </InputLabel>
          <Select
            labelId="account-select-label"
            id="account-select"
            value={accountID}
            label="Account to visualise"
            onChange={handleChange}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
                borderWidth: '0.15rem',
              },
            }}
            MenuProps={{ PaperProps: { sx: { backgroundColor: '#274E87' } } }}
          >
            <MenuItem value={0}>
              <Typography color="white">All Accounts</Typography>
            </MenuItem>
            <MenuItem value={1}>
              <Typography color="white">Sparkasse Giro</Typography>
            </MenuItem>
            <MenuItem value={2}>
              <Typography color="white">Deutsche Bank Giro</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
