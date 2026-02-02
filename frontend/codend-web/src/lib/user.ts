// src/lib/user.ts
import api from './api';

export async function updateUserName(name: string) {
  const res = await api.post('/account/name', { name });
  return res.data;
}
