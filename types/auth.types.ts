export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  photoUrl?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}
