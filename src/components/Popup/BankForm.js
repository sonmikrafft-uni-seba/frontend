import React, { useState } from 'react';
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
} from '@mui/material';

const BankForm = (props) => {
  const [country, setCountry] = useState(props.defaultCountry);

  // change selected country for bank list
  const changeCountry = (event) => {
    setCountry(event.target.value);
    props.changeCountry(event.target.value);
  };

  const selectBank = (bank) => {
    props.selectBank(bank);
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
      <Box
        sx={{
          width: '100%',
          height: '350',
          bgcolor: 'background.paper',
        }}
      >
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
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
      </Box>
    </>
  );
};

export default BankForm;
