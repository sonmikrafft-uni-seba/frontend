import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createUserSuccess,
  createUserFail,
} from './user.actions.js';
import { createUserRequest } from '../../services/user.service.js';
import { loginSuccess } from '../auth/auth.actions.js';

export function* createUserSaga(action) {
  const response = yield call(createUserRequest, action.payload);

  if (response.hasOwnProperty('error')) {
    yield put(
      createUserFail({ error: response.error, message: response.message })
    );
  } else {
    yield put(loginSuccess(response.token));
    yield put(createUserSuccess(response.user));
  }
}

export default function* root() {
  yield all([takeLatest(ACTION_TYPES.USER_CREATE_REQUEST, createUserSaga)]);
}
