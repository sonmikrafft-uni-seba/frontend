import { AUTH_ENDPOINT_API } from '../constants';

export const loginRequest = async (credentials) => {
  const response = await fetch(AUTH_ENDPOINT_API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};
