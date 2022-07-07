import { combineReducers } from 'redux';
import { user } from './user/user.reducers.js';
import { auth } from './auth/auth.reducers.js';
import { transaction } from './transaction/transaction.reducer.js';
import { popup } from './popup/popup.reducers.js';
import { app } from './app/app.reducers.js';

export const rootReducer = combineReducers({
  user: user,
  auth: auth,
  transaction: transaction,
  popup: popup,
  app: app,
});
