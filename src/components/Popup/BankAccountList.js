import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';

const BankAccountList = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '400',
        bgcolor: 'background.paper',
      }}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 400,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {props.userBanks.map((bank) => {
          return (
            <li key={`section-${bank.institutionID}`}>
              <ul>
                <ListSubheader>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 56, height: 56 }}
                        alt={bank.name}
                        src={bank.metaData.logo}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginLeft: '10px' }}
                      primary={bank.name}
                    />
                  </ListItem>
                </ListSubheader>
                <ListItem
                  key={bank.institutionID}
                  component="div"
                  disablePadding
                >
                  <List sx={{ width: '100%', marginLeft: '40px' }}>
                    {bank.bankaccounts.map((account) => {
                      const accountDetails =
                        account.metaData.iban != '-'
                          ? `IBAN: ${account.metaData.iban}   CURRENCY: ${account.metaData.currency}`
                          : `CURRENCY: ${account.metaData.currency}`;

                      return (
                        <>
                          <Divider />
                          <ListItemButton
                            sx={{ justifyContent: 'space-between' }}
                          >
                            <ListItemText
                              primary={`${account.name} - ${account.metaData.product}`}
                              secondary={accountDetails}
                            />
                            <ListItemText
                              sx={{ textAlign: 'right' }}
                              primary={account.metaData.owner}
                            ></ListItemText>
                          </ListItemButton>
                        </>
                      );
                    })}
                  </List>
                </ListItem>
              </ul>
            </li>
          );
        })}
      </List>
    </Box>
  );
};

export default BankAccountList;