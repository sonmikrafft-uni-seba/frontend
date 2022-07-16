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
        error: action.payload,
      };
    case ACTION_TYPES.TRANSACTION_UPDATE_SUCCESS:
      const newTransactionList = state.transactions.map((transaction) => {
        if (transaction._id == action.payload._id) {
          transaction = action.payload;
        }
        return transaction;
      });
      return {
        ...state,
        transactions: [...newTransactionList],
        error: null,
      };
    case ACTION_TYPES.TRANSACTION_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.TRANSACTIONS_LOAD_SUCCESS:
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
        error: null,
      };
    case ACTION_TYPES.TRANSACTIONS_LOAD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.TRANSACTION_DELETE_SUCCESS:
      return {
        ...state,
        transactions: [
          ...state.transactions.filter(
            (transaction) => transaction._id !== action.payload._id
          ),
        ],
        error: null,
      };
    case ACTION_TYPES.TRANSACTION_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
