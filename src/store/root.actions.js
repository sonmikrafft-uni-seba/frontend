import { createAction } from '@reduxjs/toolkit';
export * from './user/user.actions.js';
export * from './auth/auth.actions.js';
export * from './transaction/transaction.actions.js';
export * from './popup/popup.actions.js';
export * from './snackbar/snackbar.actions.js';
export * from './banking/banking.actions.js';
export * from './app/app.actions.js';

export const ACTION_TYPES = {
  USER_LOGOUT: 'USER_LOGOUT',
};

export const logoutUser = createAction(ACTION_TYPES.USER_LOGOUT);
