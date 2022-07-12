import { ACTION_TYPES } from './subscription.actions.js';

const initialState = {
  publicKey: null,
  premiumPriceId: null,
  subscriptionId: null,
  clientSecret: null,
  error: null,
  paymentIntent: null,
  cancelledSubscriptionId: null,
  cancel_after: null,
};

export const subscription = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SUBSCRIPTION_CREATE_SUCCESS:
      return {
        ...state,
        subscriptionId: action.payload.subscriptionId,
        clientSecret: action.payload.clientSecret,
      };
    case ACTION_TYPES.SUBSCRIPTION_CREATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.PAYMENT_INTENT_CONFIRM:
      return {
        ...state,
        paymentIntent: action.payload.paymentIntent,
        error: null,
      };
    case ACTION_TYPES.PAYMENT_INTENT_REMOVE:
      return {
        ...state,
        paymentIntent: null,
      };
    case ACTION_TYPES.SUBSCRIPTION_CANCEL_SUCCESS:
      return {
        ...state,
        subscriptionId: null,
        cancelledSubscriptionId: action.payload.id,
        cancel_after: action.payload.current_period_end,
        error: null,
      };
    case ACTION_TYPES.SUBSCRIPTION_CANCEL_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST_SUCCESS:
      return {
        ...state,
        publicKey: action.payload.publicKey,
        premiumPriceId: action.payload.priceId,
      };
    case ACTION_TYPES.SUBSCRIPTION_GET_CONFIG_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
