import { httpClient } from "../../services/http-client/http-client";
import { TableCreateParams } from "../types/table.types";


export const TableApi = {
  categoryList: async () => {
    const { data } =
      await httpClient.get('/cashier/hall/list');
    return data;
  },

  // =================================================================

  tableList: async (hall_id?: string | number) => {
    const { data } = await httpClient.get(
      '/cashier/table/list',
      {
        params: { hall_id },
      },
    );

    return data;
  },

  // =================================================================

  tableCreate: async (params: TableCreateParams) => {
    const { data } = await httpClient.post(
      '/cashier/table/create',
      params,
    );
    return data;
  },
};
