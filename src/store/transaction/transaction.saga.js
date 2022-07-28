import {
  all,
  call,
  put,
  takeLatest,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createTransactionSuccess,
  createTransactionFail,
  transactionsReassignSuccess,
  transactionsReassignFail,
  transactionsCreateMany,
  transactionsCreateManySuccess,
  transactionsCreateManyFail,
  updateTransactionSuccess,
  updateTransactionFail,
  loadTransactionsFail,
  loadTransactionsSuccess,
  deleteTransactionSuccess,
  deleteTransactionFail,
} from './transaction.actions.js';
import {
  createManyTransactionsRequest,
  updateManyTransactionRequest,
  createTransactionRequest,
  updateTransactionRequest,
  getTransactionsRequest,
  deleteTransactionRequest,
} from '../../services/transaction.service.js';
import { getAllTransactions } from '../../services/banking.service.js';
import { transactionsToUpdateWithNewCategory } from '../../utils.js';
import { defaultCategoryName, TransactionType } from '../../constants.js';

export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.user.user._id;
export const getUser = (state) => state.user.user;
export const getTransactions = (state) => state.transaction.transactions;
export const getBankingAccessToken = (state) =>
  state.banking.request.accessToken;

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

export function* createManyTransactionsSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(
    createManyTransactionsRequest,
    token,
    userId,
    action.payload
  );

  if (response.hasOwnProperty('error')) {
    yield put(
      transactionsCreateManyFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(transactionsCreateManySuccess(response));
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

export function* reassignTransactionsSaga(action) {
  const token = yield select(getToken);
  const user = yield select(getUser);
  const transactions = yield select(getTransactions);

  // all categories
  let categories = user.categoryGroups.map((group) => group.categories).flat();

  let isReassignAfterEditDelete = false;

  if (Object.entries(action.payload).length === 0) {
    isReassignAfterEditDelete = true;
  }

  // if just one category should be checked
  if (
    typeof action.payload != undefined &&
    action.payload.hasOwnProperty('categoryId')
  ) {
    categories = [
      categories.find((cat) => cat._id == action.payload.categoryId),
    ];
  }

  // if all categories except for deleted ones should be checked
  if (
    typeof action.payload != undefined &&
    action.payload.hasOwnProperty('deletedCategoryIds')
  ) {
    isReassignAfterEditDelete = true;
    categories = categories.filter(
      (cat) => !action.payload.deletedCategoryIds.includes(cat._id)
    );
  }

  let defaultCategoryId = categories.find(
    (category) => category.name == defaultCategoryName
  );
  defaultCategoryId = defaultCategoryId ? defaultCategoryId._id : null;

  // get transactions to update
  const transactionsToUpdate = transactionsToUpdateWithNewCategory(
    categories,
    transactions,
    defaultCategoryId,
    isReassignAfterEditDelete
  );

  var response = [];

  if (transactionsToUpdate.length > 0) {
    response = yield call(
      updateManyTransactionRequest,
      token,
      user._id,
      transactionsToUpdate
    );
  }

  if (response.hasOwnProperty('error')) {
    yield put(
      transactionsReassignFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(transactionsReassignSuccess(response));
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

export function* deleteTransactionSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(
    deleteTransactionRequest,
    token,
    userId,
    action.payload
  );

  if (response.hasOwnProperty('error')) {
    yield put(
      deleteTransactionFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(deleteTransactionSuccess(response));
  }
}

export function* transactionsPullBankingSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const user = yield select(getUser);
  const transactions = yield select(getTransactions);

  let categories = user.categoryGroups.map((group) => group.categories).flat();
  let defaultCategoryId = categories.find(
    (category) => category.name == defaultCategoryName
  );
  defaultCategoryId = defaultCategoryId ? defaultCategoryId._id : null;

  const allTransactions = yield call(
    getAllTransactions,
    token,
    user._id,
    bankingToken,
    user.userBanks
  );

  const newTransactions = allTransactions.filter((remoteTransaction) => {
    // return all transactions that couldn't be found in current transaction list
    return !transactions.find((existingTransaction) => {
      return (
        existingTransaction.hasOwnProperty('transactionId') &&
        existingTransaction.transactionId == remoteTransaction.transactionId &&
        existingTransaction.bankAccountID == remoteTransaction.bankAccountID
      );
    });
  });

  const newTransactionsWithCategories = transactionsToUpdateWithNewCategory(
    categories,
    newTransactions,
    defaultCategoryId
  );

  if (newTransactionsWithCategories.length > 0) {
    yield put(transactionsCreateMany(newTransactionsWithCategories));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.TRANSACTION_CREATE_REQUEST, createTransactionSaga),
    takeLatest(
      ACTION_TYPES.TRANSACTIONS_REASSIGN_REQUEST,
      reassignTransactionsSaga
    ),
    takeEvery(
      ACTION_TYPES.TRANSACTIONS_PULL_BANKING_REQUEST,
      transactionsPullBankingSaga
    ),
    takeLatest(
      ACTION_TYPES.TRANSACTIONS_CREATE_MANY_REQUEST,
      createManyTransactionsSaga
    ),
    takeLatest(ACTION_TYPES.TRANSACTIONS_LOAD_REQUEST, loadTransactionsSaga),
    takeLatest(ACTION_TYPES.TRANSACTION_UPDATE_REQUEST, updateTransactionSaga),
    takeLatest(ACTION_TYPES.TRANSACTION_DELETE_REQUEST, deleteTransactionSaga),
  ]);
}
