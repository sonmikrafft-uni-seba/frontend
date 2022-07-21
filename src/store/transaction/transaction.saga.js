import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createTransactionSuccess,
  createTransactionFail,
  updateTransactionSuccess,
  updateTransactionFail,
  loadTransactionsFail,
  loadTransactionsSuccess,
} from './transaction.actions.js';
import {
  createTransactionRequest,
  updateTransactionRequest,
  getTransactionsRequest,
} from '../../services/transaction.service.js';

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

export function* updateTransactionSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(
    updateTransactionRequest,
    token,
    userId,
    action.payload
  );

  if (response.hasOwnProperty('error')) {
    yield put(
      updateTransactionFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(updateTransactionSuccess(response));
  }
}

export function* loadTransactionsSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(getTransactionsRequest, token, userId);

  if (response.hasOwnProperty('error')) {
    yield put(
      loadTransactionsFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(loadTransactionsSuccess(response));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.TRANSACTION_CREATE_REQUEST, createTransactionSaga),
    takeLatest(ACTION_TYPES.TRANSACTIONS_LOAD_REQUEST, loadTransactionsSaga),
    takeLatest(ACTION_TYPES.TRANSACTION_UPDATE_REQUEST, updateTransactionSaga),
  ]);
}
