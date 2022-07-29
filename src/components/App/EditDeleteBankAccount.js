import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';
import { openPopup } from '../../store/popup/popup.actions';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { popupActionType, popupContentType } from '../../constants';
import { setBankAccount } from '../../store/root.actions';
import { allAccountsConstant } from '../../constants.js';
import { deleteManyTransaction } from '../../store/root.actions';

const EditDeleteBankAccount = (props) => {
  const user = useSelector((state) => state.user.user);
  const transactions = useSelector((state) => state.transaction.transactions);
  const editAccount = () => {
    props.dispatch(
      openPopup({
        title: 'Edit Bank Account Name',
        popupContentType: popupContentType.EDIT_BANK_ACCOUNT,
        popupContentObject: { account: props.account, bank: props.bank },
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
  };

  const deleteAccount = () => {
    let userToUpdate;
    if (props.bank.bankaccounts.length == 1) {
      // Delete the whole bank if only one account left
      userToUpdate = {
        ...user,
        userBanks: user.userBanks.filter(
          (userBank) => userBank._id !== props.bank._id
        ),
      };
    } else {
      // Delete the account from the userbank accounts
      userToUpdate = {
        ...user,
        userBanks: user.userBanks.map((userBank) =>
          userBank._id !== props.bank._id
            ? userBank
            : {
                ...userBank,
                bankaccounts: userBank.bankaccounts.filter(
                  (bankAccount) => bankAccount._id !== props.account._id
                ),
              }
        ),
      };
    }

    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    props.dispatch(
      openSnackbar({
        message: 'Your account has been successfully deleted.',
      })
    );
    // set Account back to all accounts
    props.dispatch(setBankAccount(allAccountsConstant));

    props.dispatch(deleteManyTransaction(props.account._id));
  };

  return (
    <>
      <IconButton edge="end" aria-label="edit" onClick={editAccount}>
        <Edit />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={deleteAccount}>
        <Delete />
      </IconButton>
    </>
  );
};

export default connect()(EditDeleteBankAccount);
