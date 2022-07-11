import { all, fork } from 'redux-saga/effects';

import user from './user/user.saga.js';
import auth from './auth/auth.saga.js';
import transaction from './transaction/transaction.saga.js';
import banking from './banking/banking.saga.js';

export default function* root() {
  yield all([fork(user), fork(auth), fork(transaction), fork(banking)]);
}
