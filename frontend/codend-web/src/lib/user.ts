// src/lib/user.ts
import api from './api';

export async function updateUserName(name: string) {
  const res = await api.post('/account/name', { name });
  return res.data;
}

export type UpdatePasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export async function updatePassword(
  payload: UpdatePasswordPayload
) {
  const res = await api.post('/account/password', payload);
  return res.data;
}
