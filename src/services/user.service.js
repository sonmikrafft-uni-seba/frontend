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

export const updateUserRequest = async (token, userId, user) => {
  const response = await fetch(USER_ENDPOINT_API + '/' + userId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const getUserRequest = async (token, userId) => {
  const response = await fetch(USER_ENDPOINT_API + '/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
  });
  return await response.json();
};

export const updateUserRequest = async (token, userId, user) => {
  const response = await fetch(USER_ENDPOINT_API + '/' + userId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};
