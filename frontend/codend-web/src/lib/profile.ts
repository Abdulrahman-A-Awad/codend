import api from './api';

export async function getMyProfile() {
  const res = await api.get('/profile/me');
  return res.data;
}

export async function updateProfile(formData: FormData) {
  const res = await api.post('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function getPublicProfile(username: string) {
  const res = await api.get(`/profiles/${username}`);
  return res.data;
}
