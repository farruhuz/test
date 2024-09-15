import { MenuStatus } from '@/enums/menu.enum';

export type MenuCategory = {
  id: number;
  name: string;
  logo: string | null;
};

// =================================================================

export type MenuList = {
  id: number;
  name: string;
  photos: Array<string>;
  price: number;
  status: MenuStatus;
  printer: boolean;
  description: string;
};

export type MenuListResponse = {
  category_id: number;
  category_name: string;
  category_logo: string | null;
  menus: Array<MenuList>;
};
