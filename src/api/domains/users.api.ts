import { httpClient } from '../../services/http-client/http-client';
import { PaginationParams } from '../types/common.types';

export const UsersApi = {

  getUsers: async (params: PaginationParams) => {
    const { data } = await httpClient.get('/users', { params });
    return data;
  },

  getUser: async (id: string | number | undefined) => {
    const { data } = await httpClient.get(`/users/${id}'`);
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await httpClient.delete(`/users/${id}`);
    return data;
  },
};
