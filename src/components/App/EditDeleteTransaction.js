import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTransaction } from '../../store/transaction/transaction.actions';
import { openPopup } from '../../store/popup/popup.actions';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { popupActionType, popupContentType } from '../../constants';

const EditDeleteTransaction = (props) => {
  const editTransactionInList = () => {
    props.dispatch(
      openPopup({
        title: 'Edit Transaction',
        popupContentType: popupContentType.EDIT_TRANSACTION,
        popupContentObject: props.transaction,
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
  };

  const deleteTransactionInList = () => {
    props.dispatch(deleteTransaction(props.transaction));
    const addRemittanceInfo =
      props.transaction.remittanceInformation.length > 0
        ? '"' + props.transaction.remittanceInformation + '"'
        : '';
    props.dispatch(
      openSnackbar({
        message:
          'Your transaction ' +
          addRemittanceInfo +
          ' has been successfully deleted.',
      })
    );
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={editTransactionInList}>
        <Edit />
      </IconButton>
      <IconButton aria-label="delete" onClick={deleteTransactionInList}>
        <Delete />
      </IconButton>
    </>
  );
};

export default connect()(EditDeleteTransaction);
