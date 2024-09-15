export type ErrorResponse = {
  error: string;
  status: boolean;
  code: number;
  statusText: string;
};

// =================================================================

export type ResponseWithPagination<T> = {
  current_page: number;
  last_page: number;
  per_page: number;
  count: number;
  results: T[];
};

// =================================================================

export type PaginationParams = {
  limit: number;
  skip?: number;
  page?: number
};

export type ResponseDelete = {
  code: number,
  data: 'ok!',
  error: string,
  status: boolean
}

export type RowData = {
  id: string;
};
