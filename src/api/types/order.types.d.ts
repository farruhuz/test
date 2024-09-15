import { OrderStatusEnum } from '@/enums/order.enum';

export type OrderList = {
  id: number;
  number: number;
  status: OrderStatusEnum;
  table_id: number;
  table_number: number;
  created_at: string;
  price: number;
  waiter_id: number;
  waiter_name: string;
  waiter_photo: string;
  menus: Array<string>;
};

// =================================================================

export type OrderMenu = {
  id: number;
  order_menu_id: number;
  status: OrderStatusEnum;
  name: string;
  price: number;
  count: number;
  photos: Array<string>;
};

export type Waiter = {
  id: number;
  name: string;
  avatar: string;
  percent: string;
  order_payment: null;
};

export type OrderDetails = {
  id: number;
  number: number;
  status: OrderStatusEnum;
  table_id: number;
  table_number: number;
  created_at: string;
  price: number;
  client_count: number;
  service_price: number;
  menus: Array<OrderMenu>;
  waiter: Waiter;
};
