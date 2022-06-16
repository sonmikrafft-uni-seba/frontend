export const USER_ENDPOINT_API = 'http://localhost:3001/auth';

export const loginRequest = async (credentials) => {
  const response = await fetch(USER_ENDPOINT_API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};
