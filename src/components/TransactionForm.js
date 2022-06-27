import React, { useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { createTransaction } from '../store/transaction/transaction.actions';
import { TransactionType } from '../constants';

const eurRegEx = /(^\d*,\d{0,2}$)|(^\d*$)/;

const TransactionForm = (props) => {
  const theme = useTheme();

  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('0,00');
  const [category, setCategory] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const categories = props.user.categoryGroups; // reduce from group to category
  const accounts = props.user.userBanks; // reduce from banks to accounts

  useEffect(() => {
    if (props.hasOwnProperty('error') && props.error != null) {
      setErrorMessage(props.error.message);
    }
  }, [props.error]);

  useEffect(() => {
    if (props.notifySave) {
      onSave();
    }
  }, [props.notifySave]);

  useEffect(() => {
    props.setSaveable(amount.trim().length != 0);
  }, [amount]);

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeAmount = (e) => {
    if (e.target.value.match(eurRegEx)) {
      setErrorMessage('');
      setAmount(e.target.value);
    } else {
      setErrorMessage('Invalid Format');
    }
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };

  const onSave = () => {
    props.dispatch(
      createTransaction({
        description: description,
        transactionAmount: amount,
        transactionType: TransactionType.MANUAL,
        categoryID: category, // TODO: replace with real id
        bankAccountID: account, //  TODO: replace with real id
      })
    );
  };

  return (
    <Container maxWidth="md">
      <Paper bgcolor={theme.palette.secondary.main} elevation={0}>
        <Box
          sx={{
            pl: 4,
            pr: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography> Description: </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="description"
                variant="outlined"
                size="small"
                fullWidth
                value={description}
                onChange={onChangeDescription}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography> Amount of money in €: </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="amount"
                label="Required"
                variant="outlined"
                size="small"
                style={{ minWidth: 240 }}
                value={amount}
                onChange={onChangeAmount}
                helperText={errorMessage.includes('amount') ? errorMessage : ''}
                error={errorMessage.includes('amount')}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography> Category of Transaction: </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                required
                variant="outlined"
                size="small"
                style={{ minWidth: 240 }}
              >
                <InputLabel id="category-label">Choose a Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  label="Choose a Category"
                  onChange={onChangeCategory}
                >
                  {categories.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Typography> Used Account: </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                variant="outlined"
                size="small"
                style={{ minWidth: 240 }}
              >
                <InputLabel id="account-label">
                  Choose a Bank Account
                </InputLabel>
                <Select
                  labelId="account-label"
                  id="account"
                  value={account}
                  label="Choose a Bank Account"
                  onChange={onChangeAccount}
                >
                  {accounts.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default connect()(TransactionForm);
