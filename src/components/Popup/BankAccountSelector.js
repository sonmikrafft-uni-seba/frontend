import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress } from '@mui/material';

const BankAccountSelector = (props) => {
  const [checked, setChecked] = React.useState([]);

  // ensure that all accounts have not just ids
  const allAccountsHaveName = (accounts) => {
    return accounts.every((account) => account.hasOwnProperty('name'));
  };

  const filterAccountsById = (accounts) => {
    return accounts.filter((account) => checked.includes(account.id));
  };

  useEffect(() => {
    props.addAccounts(filterAccountsById(props.accounts));
  }, [props.notifySave]);

  useEffect(() => {
    if (checked.length == 0) {
      props.setSaveable(false);
    } else {
      props.setSaveable(true);
    }
  }, [checked]);

  // toggle items
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
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      >
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
                <ListItemText id={labelId} primary={`IBAN: ${account.iban}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return <CircularProgress />;
  }
};

export default BankAccountSelector;
