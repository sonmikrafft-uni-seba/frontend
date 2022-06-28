import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createTransactionSuccess,
  createTransactionFail,
} from './transaction.actions.js';
import { createTransactionRequest } from '../../services/transaction.service.js';

export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.user.user._id;

export function* createTransactionSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(
    createTransactionRequest,
    token,
    userId,
    action.payload
  );

  if (response.hasOwnProperty('error')) {
    yield put(
      createTransactionFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(createTransactionSuccess(response));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.TRANSACTION_CREATE_REQUEST, createTransactionSaga),
  ]);
}
