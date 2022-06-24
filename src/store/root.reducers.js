import { combineReducers } from 'redux';
import { user } from './user/user.reducers.js';
import { auth } from './auth/auth.reducers.js';
import { popup } from './popup/popup.reducers.js';

export const rootReducer = combineReducers({
  user: user,
  auth: auth,
  popup: popup,
});
