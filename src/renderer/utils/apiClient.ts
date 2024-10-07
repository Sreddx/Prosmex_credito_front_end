import axios from 'axios';

const backendUrl = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

export default apiClient;
