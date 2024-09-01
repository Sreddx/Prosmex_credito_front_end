import axios from 'axios';

const backendUrl = 'http://localhost:5000';

// eslint-disable-next-line import/prefer-default-export
export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
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
