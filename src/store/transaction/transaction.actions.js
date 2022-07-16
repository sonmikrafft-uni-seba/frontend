import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  TRANSACTION_CREATE_REQUEST: 'TRANSACTION_CREATE_REQUEST',
  TRANSACTION_CREATE_SUCCESS: 'TRANSACTION_CREATE_SUCCESS',
  TRANSACTION_CREATE_FAIL: 'TRANSACTION_CREATE_FAIL',
  TRANSACTIONS_LOAD_REQUEST: 'TRANSACTIONS_LOAD_REQUEST',
  TRANSACTIONS_LOAD_SUCCESS: 'TRANSACTIONS_LOAD_SUCCESS',
  TRANSACTIONS_LOAD_FAIL: 'TRANSACTIONS_LOAD_FAIL',
  TRANSACTION_UPDATE_REQUEST: 'TRANSACTION_UPDATE_REQUEST',
  TRANSACTION_UPDATE_SUCCESS: 'TRANSACTION_UPDATE_SUCCESS',
  TRANSACTION_UPDATE_FAIL: 'TRANSACTION_UPDATE_FAIL',
  TRANSACTION_DELETE_REQUEST: 'TRANSACTION_DETELE_REQUEST',
  TRANSACTION_DELETE_SUCCESS: 'TRANSACTION_DETELE_SUCCESS',
  TRANSACTION_DELETE_FAIL: 'TRANSACTION_DETELE_FAIL',
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

export const updateTransaction = createAction(
  ACTION_TYPES.TRANSACTION_UPDATE_REQUEST
);
export const updateTransactionSuccess = createAction(
  ACTION_TYPES.TRANSACTION_UPDATE_SUCCESS
);
export const updateTransactionFail = createAction(
  ACTION_TYPES.TRANSACTION_UPDATE_FAIL
);

export const loadTransactions = createAction(
  ACTION_TYPES.TRANSACTIONS_LOAD_REQUEST
);
export const loadTransactionsSuccess = createAction(
  ACTION_TYPES.TRANSACTIONS_LOAD_SUCCESS
);
export const loadTransactionsFail = createAction(
  ACTION_TYPES.TRANSACTIONS_LOAD_FAIL
);

export const deleteTransaction = createAction(
  ACTION_TYPES.TRANSACTION_DELETE_REQUEST
);
export const deleteTransactionSuccess = createAction(
  ACTION_TYPES.TRANSACTION_DELETE_SUCCESS
);
export const deleteTransactionFail = createAction(
  ACTION_TYPES.TRANSACTION_DELETE_FAIL
);
