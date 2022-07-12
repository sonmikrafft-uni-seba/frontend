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
    case ACTION_TYPES.TRANSACTIONS_CREATE_MANY_SUCCESS:
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
        error: null,
      };
    case ACTION_TYPES.TRANSACTIONS_CREATE_MANY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.TRANSACTIONS_REASSIGN_SUCCESS:
      const newTransactionList = state.transactions.map((transaction) => {
        if (!Array.isArray(action.payload)) return transaction;

        // search for new version of transaction id
        const newVersion = action.payload.find((newTrans) => {
          return transaction._id == newTrans._id;
        });
        // if an updated version is available use it
        if (newVersion) {
          transaction = newVersion;
        }
        return transaction;
      });
      return {
        ...state,
        transactions: [...newTransactionList],
        error: null,
      };
    case ACTION_TYPES.TRANSACTIONS_REASSIGN_FAIL:
      return {
        ...state,
        transactions: state.transactions,
        error: action.payload,
      };
    default:
      return state;
  }
};
