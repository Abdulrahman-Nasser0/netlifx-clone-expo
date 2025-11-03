import ENV from '../../config/env';
import { crossStorage } from '../../utils/crossStorage';

const API_URL = ENV.BACKEND_API_URL;

const authHeaders = async () => {
  const token = await crossStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const userApi = {
  async getCurrent() {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/user`, { headers });
    if (!res.ok) throw new Error(`GET /user failed: ${res.status}`);
    return res.json();
  },
  async updateProfile(payload) {
    const headers = await authHeaders();
    const res = await fetch(`${API_URL}/userUpdate`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`PUT /userUpdate failed: ${res.status} ${text}`);
    }
    return res.json();
  },
 
};
