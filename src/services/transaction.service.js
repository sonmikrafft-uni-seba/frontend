export const TRANSACTION_ENDPOINT_API =
  'http://localhost:3001/user/:userId/transaction';

export const createTransactionRequest = async (transaction) => {
  const response = await fetch(TRANSACTION_ENDPOINT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  return await response.json();
};
