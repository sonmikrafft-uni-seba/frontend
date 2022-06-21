import { ACTION_TYPES } from './user.actions.js';

const initialState = { user: null, error: null };

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_CREATE_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case ACTION_TYPES.USER_CREATE_FAIL:
      return { ...state, error: action.payload, user: null };
    default:
      return state;
  }
};
