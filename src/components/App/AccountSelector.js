import * as React from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function AccountSelector() {
  const [accountID, setAccountID] = React.useState(0);
  const theme = useTheme();
  const changeSelectedAccount = (event) => {
    setAccountID(event.target.value);
  };
  return (
    <Box sx={{ mx: 'auto', width: 200 }}>
      <FormControl fullWidth>
        <InputLabel
          id="account-select-label"
          sx={{ color: theme.palette.background.contrastText }}
        >
          Account to visualise
        </InputLabel>
        <Select
          labelId="account-select-label"
          id="account-select"
          value={accountID}
          label="Account to visualise"
          onChange={changeSelectedAccount}
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.background.contrastText,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.background.contrastText,
              borderWidth: '0.15rem',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: { backgroundColor: theme.palette.background.main },
            },
          }}
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
  );
}
