export const TableQueryKeys = {
  PREFIX: 'table',
  categoryList: () => [TableQueryKeys.PREFIX, 'category-list'],
  tableList: (hallId: string | number) => [TableQueryKeys.PREFIX, 'list', hallId.toString()],
} as const;

// =================================================================

export const ProductsQueryKeys = {
  PREFIX: 'products',
  productsList: (page: number, limit: number) => [ProductsQueryKeys.PREFIX, 'list', limit, page],
  productDetails: (id: number | string) => [ProductsQueryKeys.PREFIX, 'details', id.toString()],
} as const;

// =================================================================

export const UsersQueryKeys = {
  PREFIX: 'users',
  usersList: (page: number, limit: number) => [UsersQueryKeys.PREFIX, 'list', limit, page],
  userDetails: (id: number | string) => [UsersQueryKeys.PREFIX, 'details', id.toString()],
} as const;


// =================================================================

export const ExpensesQueryKeys = {
  PREFIX: 'expenses',
  expensesList: (page: number, limit: number) => [ExpensesQueryKeys.PREFIX, 'list', limit, page],
  expensesDetails: (id: number | string) => [ExpensesQueryKeys.PREFIX, 'details', id.toString()],
  categoryList: () => [ExpensesQueryKeys.PREFIX, 'category-list'],
} as const;