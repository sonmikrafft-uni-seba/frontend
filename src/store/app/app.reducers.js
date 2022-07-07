import { ACTION_TYPES } from './app.actions.js';
import { allAccountsConstant } from '../../constants.js';

const initialState = { selectedAccount: allAccountsConstant };

export const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_BANK_ACCOUNT:
      return { ...state, selectedAccount: action.payload };
    default:
      return state;
  }
};
