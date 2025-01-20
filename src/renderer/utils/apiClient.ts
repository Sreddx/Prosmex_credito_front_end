import axios from 'axios';

//Make it dynamic with var env
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

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
