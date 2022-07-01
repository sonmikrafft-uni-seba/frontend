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
import { connect } from 'react-redux';

const AccountSelector = (props) => {
  const [accountID, setAccountID] = React.useState('');
  const theme = useTheme();

  const accounts = props.user.userBanks.map(
    (userBank) => userBank.bankaccounts
  )[0];

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
          {accounts.map((option) => (
            <MenuItem value={option._id}>
              <Typography color="white">{option.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default connect()(AccountSelector);
