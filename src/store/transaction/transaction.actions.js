import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  TRANSACTION_CREATE_REQUEST: 'TRANSACTION_CREATE_REQUEST',
  TRANSACTION_CREATE_SUCCESS: 'TRANSACTION_CREATE_SUCCESS',
  TRANSACTION_CREATE_FAIL: 'TRANSACTION_CREATE_FAIL',
};

export const createTransaction = createAction(
  ACTION_TYPES.TRANSACTION_CREATE_REQUEST
);
export const createTransactionSuccess = createAction(
  ACTION_TYPES.TRANSACTION_CREATE_SUCCESS
);
export const createTransactionFail = createAction(
  ACTION_TYPES.TRANSACTION_CREATE_FAIL
);
