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

export const getTransactionRequest = async (token, userId) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API(userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token, 
    },
  });
  return await response.json();
};