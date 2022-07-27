import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  OPEN_SNACKBAR: 'OPEN_SNACKBAR',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
};

export const openSnackbar = createAction(ACTION_TYPES.OPEN_SNACKBAR);
export const closeSnackbar = createAction(ACTION_TYPES.CLOSE_SNACKBAR);
