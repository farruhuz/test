export const AuthPaths = {
  ROOT_PATH: '/auth',
  LOGIN: 'login',
} as const;

// =================================================================

export const ProductPaths = {
  ROOT_PATH: '/products',
} as const;

// =================================================================

export const UserPaths = {
  ROOT_PATH: '/users',
} as const;

// =================================================================

export const PostPaths = {
  ROOT_PATH: '/posts',
  DETAILS: '/posts/:id',
  EDIT: '/post/:id/edit',
} as const;

// =================================================================

export const TodoPaths = {
  ROOT_PATH: '/todos',
} as const;
