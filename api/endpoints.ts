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
    create: '/parkings/new',
    details: (id: string) => `/parkings/${id}`,
    vote: (id: string) => `/parkings/${id}/vote`,
    comments: (id: string) => `/parkings/${id}/comments`,
    report: (id: string) => `/parkings/${id}/report`,
  },
} as const;
