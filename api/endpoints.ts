export const Endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  users: {
    me: '/users/me',
    leaderboard: '/users/leaderboard',
  },
  parkings: {
    nearby: '/parkings',
    details: (id: string) => `/parkings/${id}`,
  },
} as const;
