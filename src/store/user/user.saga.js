import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createUserSuccess,
  createUserFail,
  getUserSuccess,
  getUserFail,
} from './user.actions.js';
import {
  createUserRequest,
  getUserRequest,
} from '../../services/user.service.js';
import { loginSuccess } from '../auth/auth.actions.js';

export const getToken = (state) => state.auth.token;

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

export function* getUserSaga(action) {
  const token = yield select(getToken);
  const response = yield call(getUserRequest, token, action.payload);

  if (response.hasOwnProperty('error')) {
    yield put(
      getUserFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(getUserSuccess(response));
  }
}

export default function* root() {
  yield all([takeLatest(ACTION_TYPES.USER_CREATE_REQUEST, createUserSaga)]);
  yield all([takeLatest(ACTION_TYPES.USER_GET_REQUEST, getUserSaga)]);
}
