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
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const AccountSelector = (props) => {
  const accounts = props.user.userBanks
    .map((userBank) => userBank.bankaccounts)
    .flat();

  const getNameFromID = (id) => {
    const account = accounts.find((x) => x._id === id);
    const accountName = account != null ? account.name : 'allaccounts';
    return accountName;
  };

  const getIDFromName = (name) => {
    const account = accounts.find((x) => x.name === name);
    const accountID = account != null ? account._id : 0;
    return accountID;
  };

  const { bankAccountName } = useParams();
  const [accountID, setAccountID] = React.useState(
    getIDFromName(bankAccountName)
  );
  const theme = useTheme();

  useEffect(() => {
    props.setBankAccount(getNameFromID(accountID));
  }, [accountID]);

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
