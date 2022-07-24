export const TRANSACTION_ENDPOINT_API = (userId) => {
  return 'http://localhost:3001/user/' + userId + '/transaction';
};

export const createTransactionRequest = async (token, userId, transaction) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API(userId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(transaction),
  });
  return await response.json();
};

export const createManyTransactionsRequest = async (
  token,
  userId,
  transactions
) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API(userId) + '/many', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(transactions),
  });
  return await response.json();
};

export const updateTransactionRequest = async (token, userId, transaction) => {
  const endpoint = TRANSACTION_ENDPOINT_API(userId) + `/${transaction._id}`;
  delete transaction._id;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(transaction),
  });
  return await response.json();
};

export const updateManyTransactionRequest = async (
  token,
  userId,
  transactions
) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API(userId) + '/reassign', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(transactions),
  });
  return await response.json();
};

export const getTransactionsRequest = async (token, userId) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API(userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
  });
  return await response.json();
};
