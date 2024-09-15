import { TableStatusEnum } from '@/enums/table.enum';

export type TableCategory = { id: number; name: string };

// =================================================================

export type TableList = {
  id: number;
  number: number;
  status: TableStatusEnum;
  capacity: number;
  branch_id: number;
  hall_id: number;
  hall: string;
  has_order: boolean;
  client_count: number;
};

// =================================================================

export type TableCreateParams = {
  from: number;
  to: number;
  capacity: number;
  hall_id: number;
};

export type TableCreateResponse = {
  branch_id: number;
  capacity: number;
  hall_id: number;
  id: number;
  number: number;
  status: TableStatusEnum;
};

// =================================================================
