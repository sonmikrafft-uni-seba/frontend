import { ACTION_TYPES } from './popup.actions';

const initialState = {
  visible: false,
  title: '',
  popupContentType: null,
  popupActionType: null,
};

export const popup = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_POPUP:
      return {
        ...state,
        visible: true,
        title: action.payload.title || '',
        popupContentType: action.payload.popupContentType || null,
        popupActionType: action.payload.popupActionType || null,
      };
    case ACTION_TYPES.CLOSE_POPUP:
      return { ...state, visible: false };
    default:
      return state;
  }
};
