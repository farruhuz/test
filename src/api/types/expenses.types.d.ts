import { ExpensesStatusEnum } from "@/enums/expenses.enum";

export type ExpensesList = {
  id: number;
  price: number;
  tr_type: string;
  created_at: string;
  category_id: number;
  category: string;
  branch_id: number;
};

// =================================================================

export type ExpensesCreateParams = {
  price: number,
  tr_type: string,
  description: string | null, // OPTIONAL IN Backend
  category_id: number,
  created_at: string | null // OPTIONAL IN BACKEND
};

export type ExpensesCreateResponse = {
  branch_id: number;
  hall_id: number;
  id: number;
  number: number;
  status: TableStatusEnum;
};


export type ExpensesDetails = {
  branch_id: number,
  category: string,
  category_id: number,
  created_at: string,
  description: string,
  id: number,
  order_id: null,
  post_tr_balance: number,
  price: number,
  tr_type: string,
};


export type ExpenseDetailsParams = {
  branch_id: number,
  category: string,
  category_id: number,
  created_at: string,
  description: string,
  id: number | string,
  order_id: null,
  post_tr_balance: number,
  price: number | string,
  operationList: {
    label: string,
    tr_type: string,
    value: string
  },
};
