import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { deleteTransaction } from '../../store/transaction/transaction.actions';

const EditDeleteTransaction = (props) => {
  const editTransactionInList = () => {};

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
