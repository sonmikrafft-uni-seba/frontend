import { bankingTransactionToDBtransaction } from '../utils.js';
import { BANKING_ENDPOINT_API } from '../constants.js';

// get new auth token
export const getNewTokenRequest = async (token) => {
  const response = await fetch(BANKING_ENDPOINT_API + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
  });
  return await response.json();
};

// refresh auth token
export const refreshTokenRequest = async (token) => {
  const response = await fetch(BANKING_ENDPOINT_API + '/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: token,
    }),
  });
  return await response.json();
};

// get banklist for country code
export const getBankListForCountryRequest = async (
  token,
  bankingToken,
  countryCode
) => {
  const response = await fetch(BANKING_ENDPOINT_API + '/banks/' + countryCode, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'jwt ' + token,
      'Authorization-Banking': 'Bearer ' + bankingToken,
    },
  });
  return await response.json();
};

// get eua
export const getEndUserAgreementRequest = async (
  token,
  bankingToken,
  institutionId,
  agreement
) => {
  const response = await fetch(
    BANKING_ENDPOINT_API + '/banks/' + institutionId + '/eua',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'jwt ' + token,
        'Authorization-Banking': 'Bearer ' + bankingToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agreement),
    }
  );
  return await response.json();
};

// create requisition
export const getBankAuthFlowRequest = async (
  token,
  bankingToken,
  institutionId,
  auth
) => {
  const response = await fetch(
    BANKING_ENDPOINT_API + '/banks/' + institutionId + '/req',
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'jwt ' + token,
        'Authorization-Banking': 'Bearer ' + bankingToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auth),
    }
  );
  return await response.json();
};

// get requisition details
export const getRequisitionDetails = async (
  token,
  bankingToken,
  bankId,
  reqId
) => {
  const response = await fetch(
    BANKING_ENDPOINT_API + '/banks/' + bankId + '/req/' + reqId,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'jwt ' + token,
        'Authorization-Banking': 'Bearer ' + bankingToken,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

// get bank account details
export const getBankAccountDetails = async (
  token,
  bankingToken,
  bankId,
  accountId
) => {
  const response = await fetch(
    BANKING_ENDPOINT_API + '/banks/' + bankId + '/account/' + accountId,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'jwt ' + token,
        'Authorization-Banking': 'Bearer ' + bankingToken,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

// get bank account transactions
export const getBankAccountTransactions = async (
  token,
  bankingToken,
  bankId,
  accountId
) => {
  const response = await fetch(
    BANKING_ENDPOINT_API +
      '/banks/' +
      bankId +
      '/account/' +
      accountId +
      '/transactions',
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'jwt ' + token,
        'Authorization-Banking': 'Bearer ' + bankingToken,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response.json();
};

export const getAllTransactions = async (
  token,
  userId,
  bankingToken,
  banks
) => {
  let transactionList = await Promise.all(
    banks.map(async (bank) => {
      if (bank.name == 'Budgetly') {
        return;
      }

      const institutionID = 'SANDBOXFINANCE_SFIN0000'; // TODO: replace with bank.institutionID if you want to use real bank
      return await Promise.all(
        bank.bankaccounts.map(async (account) => {
          let transactions = await getBankAccountTransactions(
            token,
            bankingToken,
            institutionID,
            account.accesstoken
          );
          return {
            transactions: transactions.transactions.booked,
            bankAccountId: account._id,
          };
        })
      );
    })
  );

  // 1 because cash account
  if (transactionList.length <= 1) return transactionList;

  transactionList = transactionList
    .filter((bank) => bank)
    .reduce((p, n) => {
      return p.concat(n);
    });

  transactionList = bankingTransactionToDBtransaction(transactionList, userId);
  return transactionList;
};
