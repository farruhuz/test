import { httpClient } from "../../services/http-client/http-client";


export const ProductsApi = {

  getAllProducts: async () => {
    const { data } = await httpClient.get(`/products`);
    return data;
  },

  getProduct: async (id: any) => {
    const { data } = await httpClient.get(`/products/${id}`);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await httpClient.delete(`/products/${id}`);
    return data;
  },
};
