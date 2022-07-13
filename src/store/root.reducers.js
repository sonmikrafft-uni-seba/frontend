import { combineReducers } from 'redux';
import { user } from './user/user.reducers.js';
import { auth } from './auth/auth.reducers.js';
import { transaction } from './transaction/transaction.reducer.js';
import { popup } from './popup/popup.reducers.js';
import { banking } from './banking/banking.reducers.js';
import { app } from './app/app.reducers.js';

export const appReducer = combineReducers({
  user: user,
  auth: auth,
  transaction: transaction,
  popup: popup,
  banking: banking,
  app: app,
});

export const rootReducer = (state, action) => {
  console.log('I was here');
  if (action.type === 'USER_LOGOUT') {
    localStorage.clear();
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
