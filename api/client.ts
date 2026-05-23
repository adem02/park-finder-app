import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

type TokenProvider = () => string | null;
type UnauthorizedHandler = () => void;

let getToken: TokenProvider = () => null;
let onUnauthorized: UnauthorizedHandler = () => {};

export const configureAuth = (
  tokenProvider: TokenProvider,
  unauthorizedHandler: UnauthorizedHandler,
): void => {
  getToken = tokenProvider;
  onUnauthorized = unauthorizedHandler;
};

const baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      onUnauthorized();
    }

    return Promise.reject(error);
  },
);
