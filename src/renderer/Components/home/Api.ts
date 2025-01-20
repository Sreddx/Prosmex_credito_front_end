import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

// eslint-disable-next-line import/prefer-default-export
export const loginApi = async (usuario: string, password: string) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      usuario,
      contrasena: password,
    });

    // Return the response data (which might include the token, user info, etc.)
    return response.data;
  } catch (error) {
    // Handle errors, could be network issues or 401 Unauthorized etc.
    if (axios.isAxiosError(error) && error.response) {
      return { error: error.response.data.message || 'Login failed' };
    }
    return { error: 'Network or server error occurred' };
  }
};
