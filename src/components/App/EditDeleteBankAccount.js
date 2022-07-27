import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';
import { openPopup } from '../../store/popup/popup.actions';

// import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { popupActionType, popupContentType } from '../../constants';

const EditDeleteBankAccount = (props) => {
  const user = useSelector((state) => state.user.user);

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
    const userToUpdate = {
      ...user,
      userBanks: userBanks.map((userBank) => ({
        ...userBank,
        bankAccounts: userBank.bankAccounts.filter(
          (bankAccount) => bankAccount._id != props.account._id
        ),
      })),
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    // props.dispatch(
    //   openSnackbar({
    //     message: 'Your account name has been successfully deleted.',
    //   })
    // );
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
