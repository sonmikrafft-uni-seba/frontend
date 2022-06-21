import { combineReducers } from 'redux';
import { user } from './user/user.reducers.js';
import { auth } from './auth/auth.reducers.js';

export const rootReducer = combineReducers({
  user: user,
  auth: auth,
});
