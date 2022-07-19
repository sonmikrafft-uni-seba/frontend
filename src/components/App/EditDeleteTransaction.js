import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTransaction } from '../../store/transaction/transaction.actions';
import { openPopup } from '../../store/popup/popup.actions';
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
    props.dispatch;
  };

  const deleteTransactionInList = () => {
    props.dispatch(deleteTransaction(props.transaction));
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
