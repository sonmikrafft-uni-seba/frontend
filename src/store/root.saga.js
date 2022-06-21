import { all, fork } from 'redux-saga/effects';

import user from './user/user.saga.js';
import auth from './auth/auth.saga.js';

export default function* root() {
  yield all([fork(user), fork(auth)]);
}
