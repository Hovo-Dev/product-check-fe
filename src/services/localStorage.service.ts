const LocalStorageService = {
  revokeAllToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  setRefreshToken: (token: string) => {
    localStorage.setItem("refreshToken", token);
  },
};

export default LocalStorageService;
