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
import { TransactionCurrency } from '../../constants';
import EditDeleteBankAccount from '../App/EditDeleteBankAccount';
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
                      primaryTypographyProps={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                      primary={bank.name}
                    />
                  </ListItem>
                </ListSubheader>
                <ListItem
                  key={bank.institutionID}
                  component="div"
                  disablePadding
                >
                  <List sx={{ width: '100%' }}>
                    {bank.bankaccounts.map((account) => {
                      const accountDetails =
                        account.metaData.iban != '-'
                          ? `IBAN: ${account.metaData.iban}   CURRENCY: ${account.metaData.currency}`
                          : `CURRENCY: ${
                              account.metaData.currency == 'EUR'
                                ? TransactionCurrency.EUR
                                : account.metaData.currency
                            }`;

                      return (
                        <ListItem
                          key={account._id}
                          secondaryAction={
                            account.name === 'Default Account' ? (
                              <></>
                            ) : (
                              <EditDeleteBankAccount
                                account={account}
                                bank={bank}
                              />
                            )
                          }
                        >
                          <Divider />
                          <ListItemButton
                            sx={{ justifyContent: 'space-between' }}
                          >
                            <ListItemText
                              primary={`${account.name} - ${account.metaData.product}`}
                              secondary={accountDetails}
                              sx={{ marginLeft: '56px' }}
                            />
                            <ListItemText
                              sx={{ textAlign: 'right' }}
                              primary={account.metaData.owner}
                            ></ListItemText>
                          </ListItemButton>
                        </ListItem>
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
