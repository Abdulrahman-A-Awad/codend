import api from './api';

export async function login(login: string, password: string) {
  const res = await api.post('/auth/login', { login, password });
  return res.data; // { user, token }
}

export async function register(data: {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const res = await api.post('/auth/register', data);
  return res.data; // { user, token }
}

export async function me() {
  const res = await api.get('/me');
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
}
