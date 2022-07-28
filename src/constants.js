export const popupContentType = {
  NEW_TRANSACTION: 'NEW_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  NEW_CATEGORY: 'NEW_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  BANK_MANAGEMENT: 'BANK_MANAGEMENT',
  PREMIUM_SUBSCRIPTION: 'PREMIUM_SUBSCRIPTION',
  STRIPE_CARD_ELEMENT: 'STRIPE_CARD_ELEMENT',
  PREMIUM_SUBSCRIPTION_CONFIRMATION: 'PREMIUM_SUBSCRIPTION_CONFIRMATION',
  CANCEL_SUBSCRIPTION: 'CANCEL_SUBSCRIPTION',
  CANCEL_SUBSCRIPTION_CONFIRMATION: 'CANCEL_SUBSCRIPTION_CONFIRMATION',
};

export const BACKEND_URL = 'http://localhost:3001';
export const BANKING_ENDPOINT_API = BACKEND_URL + '/banking';
export const USER_ENDPOINT_API = BACKEND_URL;
export const AUTH_ENDPOINT_API = BACKEND_URL + '/auth';
export const SUBSCRIPTION_ENDPOINT_API = (userId) => {
  return USER_ENDPOINT_API + userId + '/subscription';
};
export const TRANSACTION_ENDPOINT_API = (userId) => {
  return USER_ENDPOINT_API + userId + '/transaction';
};

export const baseUrl = 'http://localhost:3000';
export const allAccountsConstant = 'allaccounts';
export const allCategories = 'Overview';
export const defaultCategoryGroup = 'No Group';
export const defaultCategoryName = 'Uncategorized';
export const defaultAccountName = 'Default Account';

export const popupActionType = {
  SAVE_OR_CANCEL: 'SAVE_OR_CANCEL',
  YES_OR_NO: 'YES_OR_NO',
  ADD_BANK: 'ADD_BANK',
  CONFIRM: 'CONFIRM',
  EMPTY: 'EMPTY',
};

export const BankingOnboardingState = {
  BANK_LIST: 'BANK_LIST',
  SELECT_BANK: 'SELECT_BANK',
  AUTH_BANK: 'AUTH_BANK',
  SELECT_ACCOUNTS: 'SELECT_ACCOUNTS',
};

export const BudgetType = {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  NONE: 'NONE',
};

export const SubscriptionPlan = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
};

export const TransactionCurrency = {
  EUR: 'EUR',
  DOL: 'DOLLAR',
};

export const TransactionType = {
  MANUAL: 'MANUAL',
  INCOMING: 'INCOMING',
  OUTGOING: 'OUTGOING',
};
