import { ACTION_TYPES } from './transaction.actions.js';

const initialState = { transactions: [], error: null };

export const transaction = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TRANSACTION_CREATE_SUCCESS:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        error: null,
      };
    case ACTION_TYPES.TRANSACTION_CREATE_FAIL:
      return {
        ...state,
        transactions: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
