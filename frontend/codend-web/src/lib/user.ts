import api from './api';

/* =======================
   Update Name
======================= */
export async function updateUserName(name: string) {
  const res = await api.post('/account/name', { name });
  return res.data;
}

/* =======================
   Update Password
======================= */
export type UpdatePasswordPayload = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export async function updatePassword(
  payload: UpdatePasswordPayload
) {
  const res = await api.post('/account/password', payload);
  return res.data;
}
