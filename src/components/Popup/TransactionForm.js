import React, { useEffect } from 'react';
import {
  Container,
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
import {
  createTransaction,
  updateTransaction,
} from '../../store/transaction/transaction.actions';

const eurRegEx = /(^-?\d*\.{0,1}\d{0,2}$)/;
import {
  defaultAccountName,
  defaultCategoryName,
  TransactionType,
} from '../../constants';

const TransactionForm = (props) => {
  const theme = useTheme();

  const categories = props.user.categoryGroups
    .map((group) => group.categories)
    .flat();
  const accounts = props.user.userBanks
    .map((userBank) => userBank.bankaccounts)
    .flat();

  const EDIT = props.contentObject != null;

  const [description, setDescription] = React.useState(
    EDIT ? props.contentObject.remittanceInformation : ''
  );
  const [amount, setAmount] = React.useState(
    EDIT ? '' + props.contentObject.transactionAmount : ''
  );
  const [category, setCategory] = React.useState(
    EDIT
      ? props.contentObject.categoryID
      : categories.find((cat) => cat.name === defaultCategoryName)._id
  );
  const [account, setAccount] = React.useState(
    EDIT
      ? props.contentObject.bankAccountID
      : accounts.find((acc) => acc.name === defaultAccountName)._id
  );
  const [errorMessage, setErrorMessage] = React.useState('');

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
    props.setSaveable(
      amount.trim().length != 0 && amount != 0 && category.trim().length != 0
    );
  }, [amount, category]);

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
    if (EDIT) {
      const transaction = props.contentObject;
      props.dispatch(
        updateTransaction({
          ...transaction,
          remittanceInformation: description,
          transactionAmount: amount,
          categoryID: category,
          bankAccountID: account,
        })
      );
    } else {
      props.dispatch(
        createTransaction({
          valueDate: new Date().toISOString(),
          remittanceInformation: description,
          transactionAmount: amount,
          transactionType: TransactionType.MANUAL,
          bankAccountID: account.trim().length != 0 ? account : null,
          categoryID: category,
        })
      );
    }
    props.onClosePopup();
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
              <Typography> Reference: </Typography>
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
                helperText={
                  errorMessage.includes('amount')
                    ? errorMessage
                    : 'e.g. 2.00, -5.00, -12.34'
                }
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
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
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
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
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
