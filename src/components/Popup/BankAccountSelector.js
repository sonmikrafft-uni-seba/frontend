import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  CircularProgress,
  Box,
} from '@mui/material';

const BankAccountSelector = (props) => {
  const [checked, setChecked] = React.useState([]);

  // ensure that all accounts have not just ids
  const allAccountsHaveName = (accounts) => {
    return accounts.every((account) => account.hasOwnProperty('name'));
  };

  // filter account list by selected ids
  const filterAccountsById = (accounts) => {
    return accounts.filter((account) => checked.includes(account.id));
  };

  // trigger save bank accounts
  useEffect(() => {
    props.addAccounts(filterAccountsById(props.accounts));
  }, [props.notifySave]);

  // make popup saveable or not depending on if a account is selected
  useEffect(() => {
    if (checked.length == 0) {
      props.setSaveable(false);
    } else {
      props.setSaveable(true);
    }
  }, [checked]);

  // select and unselect item
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (allAccountsHaveName(props.accounts)) {
    return (
      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {props.accounts.map((account) => {
          const labelId = `checkbox-list-${account.id}`;
          return (
            <ListItem
              key={account.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(account.id)}
                  checked={checked.indexOf(account.id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  id={labelId}
                  primary={`IBAN: ${account.iban}`}
                  secondary={account.name}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          padding: '50px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
};

export default BankAccountSelector;
