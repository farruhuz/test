import { httpClient } from '../../services/http-client/http-client';
import { PaginationParams } from '../types/common.types';

export const UsersApi = {

  getUsers: async (params: PaginationParams) => {
    const { data } = await httpClient.get('/users', { params });
    return data;
  },

  addUser: async (id: string) => {
    const { data } = await httpClient.get(`/products/${id}'`);
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await httpClient.delete(`/products/${id}`);
    return data;
  },
};
