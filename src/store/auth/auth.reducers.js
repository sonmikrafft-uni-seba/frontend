import { ACTION_TYPES } from './auth.actions.js';

const initialState = { token: null, error: null };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, token: action.payload, error: null };
    case ACTION_TYPES.LOGIN_FAIL:
      return { ...state, token: null, error: action.payload };
    case ACTION_TYPES.LOGOUT:
      return { ...state, token: null, error: null };
    default:
      return state;
  }
};
