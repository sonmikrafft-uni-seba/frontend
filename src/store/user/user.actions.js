import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  USER_CREATE_REQUEST: 'USER_CREATE_REQUEST',
  USER_CREATE_SUCCESS: 'USER_CREATE_SUCCESS',
  USER_CREATE_FAIL: 'USER_CREATE_FAIL',
  USER_GET_REQUEST: 'USER_GET_REQUEST',
  USER_GET_SUCCESS: 'USER_GET_SUCCESS',
  USER_GET_FAIL: 'USER_GET_FAIL',
};

export const createUser = createAction(ACTION_TYPES.USER_CREATE_REQUEST);
export const createUserSuccess = createAction(ACTION_TYPES.USER_CREATE_SUCCESS);
export const createUserFail = createAction(ACTION_TYPES.USER_CREATE_FAIL);
export const getUser = createAction(ACTION_TYPES.USER_GET_REQUEST);
export const getUserSuccess = createAction(ACTION_TYPES.USER_GET_SUCCESS);
export const getUserFail = createAction(ACTION_TYPES.USER_GET_FAIL);
