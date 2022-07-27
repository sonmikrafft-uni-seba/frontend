import { ACTION_TYPES } from './snackbar.actions';

const initialState = {
  open: false,
  message: '',
};

export const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.payload.message || '',
      };
    case ACTION_TYPES.CLOSE_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};
