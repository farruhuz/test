import { httpClient } from "../../services/http-client/http-client";


export const ProductsApi = {

  getAllProducts: async (limit?: number) => {
    const { data } = await httpClient.get(`/products?limit=${limit}`);
    return data;
  },

  getProduct: async (id: number | string) => {
    const { data } = await httpClient.get(`/products/${id}'`);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await httpClient.delete(`/products/${id}`);
    return data;
  },
};
