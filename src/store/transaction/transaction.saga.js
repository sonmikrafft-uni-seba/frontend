import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createTransactionSuccess,
  createTransactionFail,
  transactionsReassignSuccess,
  transactionsReassignFail,
  transactionsCreateMany,
  transactionsCreateManySuccess,
  transactionsCreateManyFail,
} from './transaction.actions.js';
import {
  createManyTransactionsRequest,
  updateManyTransactionRequest,
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

export function* reassignTransactionsSaga(action) {
  const token = yield select(getToken);
  const user = yield select(getUser);
  const transactions = yield select(getTransactions);

  // all categories
  let categories = user.categoryGroups.map((group) => group.categories).flat();

  // if just one category should be checked
  if (action.payload.hasOwnProperty('categoryId')) {
    categories = [
      categories.find((cat) => cat._id == action.payload.categoryId),
    ];
  }

  // get transactions to update
  const transactionsToUpdate = transactionsToUpdateWithNewCategory(
    categories,
    transactions
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
    defaultCategoryId,
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
    newTransactions
  );

  yield put(transactionsCreateMany(newTransactionsWithCategories));
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.TRANSACTION_CREATE_REQUEST, createTransactionSaga),
    takeLatest(
      ACTION_TYPES.TRANSACTIONS_REASSIGN_REQUEST,
      reassignTransactionsSaga
    ),
    takeLatest(
      ACTION_TYPES.TRANSACTIONS_PULL_BANKING_REQUEST,
      transactionsPullBankingSaga
    ),
    takeLatest(
      ACTION_TYPES.TRANSACTIONS_CREATE_MANY_REQUEST,
      createManyTransactionsSaga
    ),
  ]);
}
