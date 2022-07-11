import * as React from 'react';
import { useEffect } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector, connect } from 'react-redux';
import { allAccountsConstant } from '../../constants.js';
import { setBankAccount } from '../../store/app/app.actions.js';

const AccountSelector = (props) => {
  const accounts = props.user.userBanks
    .map((userBank) => userBank.bankaccounts)
    .flat();
  const selectedAccount = useSelector((state) => state.app.selectedAccount);
  const theme = useTheme();

  const changeSelectedAccount = (event) => {
    props.dispatch(setBankAccount(event.target.value));
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
          value={selectedAccount}
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
          <MenuItem key={allAccountsConstant} value={allAccountsConstant}>
            <Typography color="white">All Accounts</Typography>
          </MenuItem>
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              <Typography color="white">{account.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default connect()(AccountSelector);
