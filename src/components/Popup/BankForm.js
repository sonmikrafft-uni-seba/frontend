import React, { useState, useEffect } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material';

const BankForm = (props) => {
  const [country, setCountry] = useState(props.defaultCountry);
  const [loading, setLoading] = useState(false);

  // change selected country for bank list
  const changeCountry = (event) => {
    setLoading(true);
    setCountry(event.target.value);
    props.changeCountry(event.target.value);
  };

  const selectBank = (bank) => {
    props.selectBank(bank);
  };

  useEffect(() => {
    setLoading(false);
  }, [props.banks]);

  const renderContent = (loading) => {
    if (loading) {
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
    } else {
      return (
        <Box
          sx={{
            width: '100%',
            height: '350',
            bgcolor: 'background.paper',
          }}
        >
          <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
            {props.banks.map((bank) => {
              return (
                <ListItem key={bank.id} component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      selectBank({
                        id: bank.id,
                        name: bank.name,
                        logo: bank.logo,
                      });
                    }}
                  >
                    <ListItemText primary={bank.name} />
                    <img src={bank.logo} style={{ height: '150px' }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          ;
        </Box>
      );
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="country-select-id">Country</InputLabel>
        <Select
          labelId="country-select-id"
          id="country-selector"
          value={country}
          onChange={changeCountry}
          autoWidth
          label="Country"
        >
          <MenuItem value={'DE'}>Germany</MenuItem>
          <MenuItem value={'AT'}>Austria</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
          <MenuItem value={'GB'}>Great Britain</MenuItem>
          <MenuItem value={'ES'}>Spain</MenuItem>
        </Select>
      </FormControl>
      {renderContent(loading)}
    </>
  );
};

export default BankForm;
