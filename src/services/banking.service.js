export const BANKING_ENDPOINT_API = 'http://localhost:3001/banking';

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
