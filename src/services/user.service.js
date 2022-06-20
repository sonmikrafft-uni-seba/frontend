export const USER_ENDPOINT_API = 'http://localhost:3001/user';

export const createUserRequest = async (user) => {
  const response = await fetch(USER_ENDPOINT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};