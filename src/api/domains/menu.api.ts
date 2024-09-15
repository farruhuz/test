import { httpClient } from "../../services/http-client/http-client";


export const MenuApi = {
  menuCategory: async () => {
    const { data } = await httpClient.get(
      '/cashier/menu-category/list',
    );

    return data;
  },

  // =================================================================

  menuList: async (category_id: string | number) => {
    const { data } = await httpClient.get(
      '/cashier/menu/list',
      {
        params: {
          category_id,
        },
      },
    );

    return data;
  },
};
