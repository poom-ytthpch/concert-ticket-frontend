interface User {
  id: string;
  username: string;
  email: string;
  mobile: string;
  roles: string[];
  isAdmin: boolean;
}

interface TokenPayload {
  userInfo: User;
}

interface DecodedToken {
  payload: TokenPayload;
  userInfo: User;
  iat: number;
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export type { User, TokenPayload, DecodedToken, AuthState };
