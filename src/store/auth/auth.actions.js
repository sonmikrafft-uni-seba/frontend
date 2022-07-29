import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};

export const login = createAction(ACTION_TYPES.LOGIN);
export const loginSuccess = createAction(ACTION_TYPES.LOGIN_SUCCESS);
export const loginFail = createAction(ACTION_TYPES.LOGIN_FAIL);
