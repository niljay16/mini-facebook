// utils/auth.js

export const saveUser = (token, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const token = getToken();
  const username = localStorage.getItem('username');
  return token ? { token, username } : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
