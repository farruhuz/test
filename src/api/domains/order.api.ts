import { httpClient } from "../../services/http-client/http-client";
import { PaginationParams } from "../types/common.types";


export const OrderApi = {
  orderList: async (params: PaginationParams) => {
    const { data } = await httpClient.get(
      '/cashier/order/list',
      { params },
    );

    return data;
  },

  orderDetails: async (id: number | string) => {
    const { data } = await httpClient.get(`/cashier/order/${id}`);

    return data;
  },
};
