import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  ACTION_TYPES,
  remoteBankingTokenSuccess,
  remoteBankingTokenFail,
  remoteBankingRefreshTokenFail,
  remoteBankingRefreshTokenSuccess,
  remoteBankingListBankFail,
  remoteBankingListBankSuccess,
  remoteBankingEUASuccess,
  remoteBankingEUAFail,
  remoteBankingAuthFail,
  remoteBankingAuthSuccess,
  remoteBankingAccountsSuccess,
  remoteBankingAccountsFail,
  remoteBankingAccountDetailsSuccess,
  remoteBankingAccountDetailsFail,
  remoteBankingAccountTransactionsSuccess,
  remoteBankingAccountTransactionsFail,
} from './banking.actions';
import {
  getBankListForCountryRequest,
  getNewTokenRequest,
  refreshTokenRequest,
  getEndUserAgreementRequest,
  getBankAuthFlowRequest,
  getBankAccountDetails,
  getBankAccountTransactions,
  getRequisitionDetails,
} from '../../services/banking.service';

export const getToken = (state) => state.auth.token;
export const getBankingAccessToken = (state) =>
  state.banking.request.accessToken;
export const getReqId = (state) =>
  state.banking.accountOnboarding.requisitionId;
export const getSelectedBank = () => 'SANDBOXFINANCE_SFIN0000';
// TODO: uncomment when using real banks
// (state) => state.banking.accountOnboarding.selectedBank.id;

// get new nordigen access token from our backend
export function* getBankingTokenSaga() {
  const token = yield select(getToken);
  const response = yield call(getNewTokenRequest, token);

  if (response.hasOwnProperty('error')) {
    yield put(remoteBankingTokenFail(response.error));
  } else {
    yield put(remoteBankingTokenSuccess(response));
  }
}

// get new nordigen refresh access token from our backend
export function* refreshBankingTokenSaga(action) {
  const response = yield call(refreshTokenRequest, action.payload);

  if (response.hasOwnProperty('error')) {
    yield put(remoteBankingRefreshTokenFail(response.error));
  } else {
    yield put(remoteBankingRefreshTokenSuccess(response));
  }
}

// get bank list for country
export function* getRemoteBankingListBankSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);

  const bankList = yield call(
    getBankListForCountryRequest,
    token,
    bankingToken,
    action.payload // country code
  );

  if (Array.isArray(bankList)) {
    yield put(remoteBankingListBankSuccess(bankList));
  } else {
    yield put(remoteBankingListBankFail('error'));
  }
}

// get eua for bank
export function* getEUAforBankSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const bankId = yield select(getSelectedBank);

  const eua = yield call(
    getEndUserAgreementRequest,
    token,
    bankingToken,
    bankId,
    action.payload // max_historical_days, access_valid_for_days, access_scope
  );

  if (eua.hasOwnProperty('id')) {
    yield put(remoteBankingEUASuccess(eua));
  } else {
    yield put(remoteBankingEUAFail(eua));
  }
}

// get requisition for bank
export function* getReqforBankSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const bankId = yield select(getSelectedBank);

  const requisition = yield call(
    getBankAuthFlowRequest,
    token,
    bankingToken,
    bankId,
    action.payload // redirect, reference, agreement, user_language
  );

  if (requisition.hasOwnProperty('link')) {
    yield put(remoteBankingAuthSuccess(requisition));
  } else {
    yield put(remoteBankingAuthFail(requisition));
  }
}

// get accounts for bank requisition
export function* getRequisitionDetailsSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const bankId = yield select(getSelectedBank);
  const reqId = yield select(getReqId);

  const details = yield call(
    getRequisitionDetails,
    token,
    bankingToken,
    bankId,
    reqId
  );

  if (details.hasOwnProperty('accounts')) {
    yield put(remoteBankingAccountsSuccess(details));
  } else {
    yield put(remoteBankingAccountsFail(details));
  }
}

// get account details
export function* getAccountDetailsSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const bankId = yield select(getSelectedBank);

  const details = yield call(
    getBankAccountDetails,
    token,
    bankingToken,
    bankId,
    action.payload.accountId
  );

  if (details.hasOwnProperty('account')) {
    yield put(remoteBankingAccountDetailsSuccess(details));
  } else {
    yield put(remoteBankingAccountDetailsFail(details));
  }
}

// get accounts transactions
export function* getAccountTransactionsSaga(action) {
  const token = yield select(getToken);
  const bankingToken = yield select(getBankingAccessToken);
  const bankId = yield select(getSelectedBank);

  const transactions = yield call(
    getBankAccountTransactions,
    token,
    bankingToken,
    bankId,
    action.payload.accountId
  );

  if (transactions.hasOwnProperty('transactions')) {
    yield put(remoteBankingAccountTransactionsSuccess(transactions));
  } else {
    yield put(remoteBankingAccountTransactionsFail(transactions));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.REMOTE_BANKING_TOKEN_REQUEST, getBankingTokenSaga),
    takeLatest(
      ACTION_TYPES.REMOTE_BANKING_REFRESH_TOKEN_REQUEST,
      refreshBankingTokenSaga
    ),
    takeEvery(
      ACTION_TYPES.REMOTE_BANKING_LIST_BANK_REQUEST,
      getRemoteBankingListBankSaga
    ),
    takeEvery(ACTION_TYPES.REMOTE_BANKING_EUA_REQUEST, getEUAforBankSaga),
    takeEvery(ACTION_TYPES.REMOTE_BANKING_AUTH_REQUEST, getReqforBankSaga),
    takeEvery(
      ACTION_TYPES.REMOTE_BANKING_ACCOUNTS_REQUEST,
      getRequisitionDetailsSaga
    ),
    takeEvery(
      ACTION_TYPES.REMOTE_BANKING_ACCOUNT_DETAILS_REQUEST,
      getAccountDetailsSaga
    ),
    takeEvery(
      ACTION_TYPES.REMOTE_BANKING_ACCOUNT_TRANSACTIONS_REQUEST,
      getAccountTransactionsSaga
    ),
  ]);
}
