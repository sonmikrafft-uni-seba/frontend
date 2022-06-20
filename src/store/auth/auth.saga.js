import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ACTION_TYPES, loginSuccess, loginFail } from './auth.actions.js';
import { loginRequest } from '../../services/auth.service.js';

export function* loginSaga(action) {
  const response = yield call(loginRequest, action.payload);

  if (response.hasOwnProperty('error')) {
    yield put(loginFail({ error: response.error, message: response.message }));
  } else {
    yield put(loginSuccess(response.token));
  }
}

export default function* root() {
  yield all([takeLatest(ACTION_TYPES.LOGIN, loginSaga)]);
}
