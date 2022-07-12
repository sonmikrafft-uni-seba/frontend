import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  SUBSCRIPTION_CREATE_REQUEST: 'SUBSCRIPTION_CREATE_REQUEST',
  SUBSCRIPTION_CREATE_SUCCESS: 'SUBSCRIPTION_CREATE_SUCCESS',
  SUBSCRIPTION_CREATE_FAIL: 'SUBSCRIPTION_CREATE_FAIL',

  SUBSCRIPTION_CANCEL_REQUEST: 'SUBSCRIPTION_CANCEL_REQUEST',
  SUBSCRIPTION_CANCEL_SUCCESS: 'SUBSCRIPTION_CANCEL_SUCCESS',
  SUBSCRIPTION_CANCEL_FAIL: 'SUBSCRIPTION_CANCEL_FAIL',

  PAYMENT_INTENT_CONFIRM: 'PAYMENT_INTENT_CONFIRM',
  PAYMENT_INTENT_REMOVE: 'PAYMENT_INTENT_REMOVE',

  SUBSCRIPTION_GET_CONFIG_REQUEST: 'SUBSCRIPTION_GET_CONFIG_REQUEST',
  SUBSCRIPTION_GET_CONFIG_REQUEST_SUCCESS:
    'SUBSCRIPTION_GET_CONFIG_REQUEST_SUCCESS',
  SUBSCRIPTION_GET_CONFIG_REQUEST_FAIL: 'SUBSCRIPTION_GET_CONFIG_REQUEST_FAIL',
};

export const createSubscription = createAction(
  ACTION_TYPES.SUBSCRIPTION_CREATE_REQUEST
);
export const createSubscriptionSuccess = createAction(
  ACTION_TYPES.SUBSCRIPTION_CREATE_SUCCESS
);
export const createSubscriptionFail = createAction(
  ACTION_TYPES.SUBSCRIPTION_CREATE_FAIL
);

export const confirmPaymentIntent = createAction(
  ACTION_TYPES.PAYMENT_INTENT_CONFIRM
);

export const removePaymentIntent = createAction(
  ACTION_TYPES.PAYMENT_INTENT_REMOVE
);

export const cancelSubscription = createAction(
  ACTION_TYPES.SUBSCRIPTION_CANCEL_REQUEST
);
export const cancelSubscriptionSuccess = createAction(
  ACTION_TYPES.SUBSCRIPTION_CANCEL_SUCCESS
);
export const cancelSubscriptionFail = createAction(
  ACTION_TYPES.SUBSCRIPTION_CANCEL_FAIL
);

export const getConfig = createAction(
  ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST
);
export const getConfigSuccess = createAction(
  ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST_SUCCESS
);
export const getConfigFail = createAction(
  ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST_FAIL
);
