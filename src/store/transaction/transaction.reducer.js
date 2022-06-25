import { ACTION_TYPES } from './transaction.actions.js';

const initialState = { transaction: null, error: null };

export const transaction = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TRANSACTION_CREATE_SUCCESS:
      return { ...state, transaction: action.payload, error: null };
    case ACTION_TYPES.TRANSACTION_CREATE_FAIL:
      return { ...state, error: action.payload, transaction: null };
    default:
      return state;
  }
};
