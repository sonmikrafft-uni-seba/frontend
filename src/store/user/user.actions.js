import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  USER_CREATE_REQUEST: 'USER_CREATE_REQUEST',
  USER_CREATE_SUCCESS: 'USER_CREATE_SUCCESS',
  USER_CREATE_FAIL: 'USER_CREATE_FAIL',
};

export const createUser = createAction(ACTION_TYPES.USER_CREATE_REQUEST);
export const createUserSuccess = createAction(ACTION_TYPES.USER_CREATE_SUCCESS);
export const createUserFail = createAction(ACTION_TYPES.USER_CREATE_FAIL);
