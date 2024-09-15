import { httpClient } from "../../services/http-client/http-client";


export const AuthApi = {

  login: async (username: string, password: string, expiresInMins: number) => {
    const { data } = await httpClient.post('/auth/login', {
      username,
      password,
      expiresInMins
    });
    return data;
  },

  // =================================================================

  getMe: async () => {
    const { data } = await httpClient.get('/auth/me');
    return data;
  },
};
