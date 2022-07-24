import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createSubscriptionSuccess,
  createSubscriptionFail,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail,
  getConfigSuccess,
  getConfigFail,
} from './subscription.actions.js';
import {
  createSubscriptionRequest,
  cancelSubscriptionRequest,
  getConfig,
} from '../../services/subscription.service.js';

export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.user.user._id;
export const getPriceId = (state) => state.subscription.premiumPriceId;
export const getSubscriptionId = (state) => state.subscription.subscriptionId;

export function* getConfigSaga() {
  const token = yield select(getToken);
  const userId = yield select(getUserId);

  const config = yield call(getConfig, token, userId);

  if (config.hasOwnProperty('error')) {
    yield put(getConfigFail(config));
  } else {
    yield put(getConfigSuccess(config));
  }
}

export function* createSubscriptionSaga() {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const priceId = yield select(getPriceId);
  const createdSubscription = yield call(
    createSubscriptionRequest,
    token,
    userId,
    priceId
  );
  console.log(createdSubscription);
  if (createdSubscription.hasOwnProperty('subscriptionId')) {
    yield put(createSubscriptionSuccess(createdSubscription));
  } else {
    yield put(createSubscriptionFail(createdSubscription));
  }
}

export function* cancelSubscriptionSaga() {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const subscriptionId = yield select(getSubscriptionId);
  const result = yield call(
    cancelSubscriptionRequest,
    token,
    userId,
    subscriptionId
  );
  if (result.hasOwnProperty('error')) {
    console.log(result);
    yield put(cancelSubscriptionFail(result));
  } else {
    console.log(result);
    yield put(cancelSubscriptionSuccess(result));
  }
}

export default function* root() {
  yield all([
    takeLatest(ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST, getConfigSaga),
    takeLatest(
      ACTION_TYPES.SUBSCRIPTION_CREATE_REQUEST,
      createSubscriptionSaga
    ),
    takeLatest(
      ACTION_TYPES.SUBSCRIPTION_CANCEL_REQUEST,
      cancelSubscriptionSaga
    ),
  ]);
}
