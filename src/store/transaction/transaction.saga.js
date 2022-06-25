import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createTransactionSuccess,
  createTransactionFail,
} from './transaction.actions.js';
import { createTransactionRequest } from '../../services/transaction.service.js';

export function* createTransactionSaga(action) {
  const response = yield call(createTransactionRequest, action.payload);

  if (response.hasOwnProperty('error')) {
    yield put(
      createTransactionFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(createTransactionSuccess(response.transaction));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.TRANSACTION_CREATE_REQUEST, createTransactionSaga),
  ]);
}
