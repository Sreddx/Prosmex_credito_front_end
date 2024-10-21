import apiClient from '../../utils/apiClient';

interface UserResponse {
  apellido_materno: string;
  apellido_paterno: string;
  usuario: string;
  nombre: string;
  rol: string;
  rol_id: number;
  userId: number;
}

interface LoginResponse {
  data: {
    access_token: SetStateAction<string | null>;
    User: UserResponse;
    message: string;
  };
  access_token: string;
}

interface ErrorResponse {
  error: string;
}

// eslint-disable-next-line import/prefer-default-export
export const loginApi = async (
  usuario: string,
  password: string,
): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      usuario: usuario,
      contrasena: password,
    });

    // Since the response is wrapped in a "data" object, we access it here
    return response.data;
  } catch (error) {
    const err = error as any; // Proper typing for AxiosError
    if (err.response) {
      return { error: err.response.data.message || 'Login failed' };
    }
    return { error: 'Network or server error occurred' };
  }
};
