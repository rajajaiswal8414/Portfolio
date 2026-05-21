import { AuthUser, AuthTokens } from '@/types/auth';

const BASE_URL = 'http://192.168.0.3:8080/api/v1';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;           // seconds until access token expires
  userDetailsDto: {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: string[];           // e.g. ["ADMIN"]
  };
}

/**
 * Sends credentials to the backend and returns raw response data.
 * The caller (authStore.login) is responsible for persisting tokens.
 */
export async function loginUser(creds: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username:       creds.username,
      password:       creds.password,
      rememberMe:     true,
      academicYearId: 1,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? 'Login failed. Please check your credentials.');
  }

  return data;
}