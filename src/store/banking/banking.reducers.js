import { BankingOnboardingState } from '../../constants';
import { ACTION_TYPES } from './banking.actions';

const initialState = {
  request: {
    accessToken: null,
    refreshToken: null,
    error: null,
    payload: null,
    type: null,
  },
  accountOnboarding: {
    state: BankingOnboardingState.BANK_LIST,
    selectedBank: {
      id: null,
      name: null,
      logo: null,
    },
    euaId: null,
    requisitionId: null,
    accounts: [],
  },
};

export const banking = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.REMOTE_BANKING_TOKEN_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          accessToken: action.payload.access,
          refreshToken: action.payload.refresh,
          error: null,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_TOKEN_SUCCESS,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_TOKEN_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          accessToken: null,
          refreshToken: null,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_TOKEN_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          accessToken: action.payload.access,
          error: null,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_REFRESH_TOKEN_SUCCESS,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_REFRESH_TOKEN_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          accessToken: null,
          refreshToken: null,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_REFRESH_TOKEN_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_LIST_BANK_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          error: null,
          payload: action.payload,
          type: ACTION_TYPES.REMOTE_BANKING_LIST_BANK_SUCCESS,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_LIST_BANK_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_LIST_BANK_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_EUA_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          error: null,
          payload: action.payload,
          type: ACTION_TYPES.REMOTE_BANKING_EUA_SUCCESS,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_EUA_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_EUA_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_AUTH_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_AUTH_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_AUTH_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          error: null,
          payload: action.payload,
          type: ACTION_TYPES.REMOTE_BANKING_AUTH_SUCCESS,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          accounts: action.payload.accounts.map((id) => {
            return { id: id };
          }),
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_ACCOUNTS_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_ACCOUNTS_FAIL,
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          accounts: state.accountOnboarding.accounts.map((account) => {
            if (account.id == action.payload.account.id) {
              return { ...action.payload.account };
            }
            return account;
          }),
        },
      };
    case ACTION_TYPES.REMOTE_BANKING_ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          payload: null,
          type: ACTION_TYPES.REMOTE_BANKING_ACCOUNT_DETAILS_FAIL,
        },
      };
    case ACTION_TYPES.SET_BANKING_ACCOUNT_ONBOARDING_STATE:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          state: action.payload,
        },
      };
    case ACTION_TYPES.SET_BANK_FOR_ONBOARDING:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          selectedBank: action.payload,
        },
      };
    case ACTION_TYPES.SET_EUA_FOR_ONBOARDING:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          euaId: action.payload,
        },
      };
    case ACTION_TYPES.SET_REQ_FOR_ONBOARDING:
      return {
        ...state,
        accountOnboarding: {
          ...state.accountOnboarding,
          requisitionId: action.payload,
        },
      };
    case ACTION_TYPES.RESET_BANKING_ACCOUNT_ONBOARDING:
      return {
        ...state,
        request: {
          accessToken: state.request.accessToken,
          refreshToken: state.request.refreshToken,
          error: null,
          payload: null,
          type: null,
        },
        accountOnboarding: {
          state: BankingOnboardingState.BANK_LIST,
          selectedBank: {
            id: null,
            name: null,
            logo: null,
          },
          euaId: null,
          requisitionId: null,
          accounts: [],
        },
      };
    default:
      return state;
  }
};
