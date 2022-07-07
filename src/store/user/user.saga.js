import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  createUserSuccess,
  createUserFail,
  updateUserSuccess,
  updateUserFail,
  getUserSuccess,
  getUserFail,
  updateUserSuccess,
  updateUserFail,
} from './user.actions.js';
import {
  createUserRequest,
  updateUserRequest,
  getUserRequest,
  updateUserRequest,
} from '../../services/user.service.js';
import { loginSuccess } from '../auth/auth.actions.js';

export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.user.user._id;

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

export function* updateUserSaga(action) {
  const token = yield select(getToken);
  const userId = yield select(getUserId);
  const response = yield call(
    updateUserRequest,
    token,
    userId,
    action.payload.userToUpdate
  );
  if (response.hasOwnProperty('error')) {
    yield put(
      updateUserFail({
        error: response.error,
        message: response.message,
      })
    );
  } else {
    yield put(updateUserSuccess(response));
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
  yield all([takeLatest(ACTION_TYPES.USER_UPDATE_REQUEST, updateUserSaga)]);
  yield all([takeLatest(ACTION_TYPES.USER_GET_REQUEST, getUserSaga)]);
}
