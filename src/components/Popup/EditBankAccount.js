import React, { useEffect } from 'react';
import { Typography, Grid, TextField, Box } from '@mui/material';
import { connect } from 'react-redux';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { updateUser } from '../../store/user/user.actions';

const EditBankAccount = (props) => {
  const accounts = props.user.userBanks
    .map((userBank) => userBank.bankaccounts)
    .flat();
  const currentAccount = accounts.find(
    (account) => account._id == props.contentObject.account._id
  );
  const [accountName, setAccountName] = React.useState(
    props.contentObject.account.name
  );

  useEffect(() => {
    props.setSaveable(accountName.length != 0);
  }, [accountName]);

  useEffect(() => {
    if (props.notifySave) {
      onSave();
    }
  }, [props.notifySave]);

  const onSave = () => {
    const accountId = props.contentObject.account._id;
    const bankId = props.contentObject.bank._id;
    const bankAccountToUpdate = {
      ...currentAccount,
      name: accountName,
    };
    const userToUpdate = {
      ...props.user,
      userBanks: props.user.userBanks.map((userBank) =>
        userBank._id !== bankId
          ? userBank
          : {
              ...userBank,
              bankaccounts: userBank.bankaccounts.map((account) =>
                account._id !== accountId ? account : bankAccountToUpdate
              ),
            }
      ),
    };
    props.dispatch(updateUser({ userToUpdate }));
    props.onClosePopup();
    props.dispatch(
      openSnackbar({
        message: 'Your account name has been successfully updated.',
      })
    );
  };

  const onChangeAccountName = (e) => {
    setAccountName(e.target.value);
  };

  return (
    <Grid container py={1} justifyContent="flex-start">
      <Grid item sx={{ py: 1 }} xs={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          pt={2}
        >
          <Typography>Name of account:</Typography>
        </Box>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={10}>
        <TextField
          variant="outlined"
          required
          id="accountName"
          label="Account Name"
          name="accountName"
          autoComplete=""
          value={accountName}
          onChange={onChangeAccountName}
        ></TextField>
      </Grid>
    </Grid>
  );
};
export default connect()(EditBankAccount);
