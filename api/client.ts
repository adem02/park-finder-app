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

  if (__DEV__) {
    console.log(
      `[api] → ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url ?? ''}`,
      config.data ?? '',
    );
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(
        `[api] ← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url ?? ''}`,
        response.data,
      );
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      const status = error?.response?.status ?? 'NETWORK';
      const url = error?.config?.url ?? '';
      const method = error?.config?.method?.toUpperCase() ?? '';
      console.log(
        `[api] ✗ ${status} ${method} ${url}`,
        error?.response?.data ?? error?.message ?? error,
      );
    }

    if (error?.response?.status === 401) {
      onUnauthorized();
    }

    return Promise.reject(error);
  },
);
