type TokenParsed = {
  exp?: number;
  [key: string]: unknown;
};

type TokenData = {
  token: string;
  refreshToken?: string;
  tokenParsed?: TokenParsed;
};

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRES_KEY = "token_expires";

export const tokenStorage = {
  saveTokens: (tokens: TokenData) => {
    if (tokens.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.token);
    }
    if (tokens.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
    if (tokens?.tokenParsed?.exp) {
      const expiresAt = tokens.tokenParsed.exp * 1000; // Convert to ms
      localStorage.setItem(TOKEN_EXPIRES_KEY, expiresAt.toString());
    }
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getTokenExpiration: (): number | null => {
    const expires = localStorage.getItem(TOKEN_EXPIRES_KEY);
    return expires ? parseInt(expires, 10) : null;
  },

  isTokenValid: (): boolean => {
    const expires = tokenStorage.getTokenExpiration();
    if (!expires) return false;
    return Date.now() < expires;
  },
};
