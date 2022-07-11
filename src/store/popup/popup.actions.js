import { createAction } from '@reduxjs/toolkit';

export const ACTION_TYPES = {
  OPEN_POPUP: 'OPEN_POPUP',
  CLOSE_POPUP: 'CLOSE_POPUP',
  CHANGE_POPUP: 'CHANGE_POPUP',
};

export const openPopup = createAction(ACTION_TYPES.OPEN_POPUP);
export const closePopup = createAction(ACTION_TYPES.CLOSE_POPUP);
export const changePopup = createAction(ACTION_TYPES.CHANGE_POPUP);
