import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  SET_BANK_ACCOUNT: 'SET_BANK_ACCOUNT',
};
export const setBankAccount = createAction(ACTION_TYPES.SET_BANK_ACCOUNT);
