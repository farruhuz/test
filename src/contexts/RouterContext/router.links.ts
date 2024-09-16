import { generatePath } from 'react-router';

import { join } from './router.helpers';
import { AuthPaths, PostPaths, ProductPaths, TodoPaths, UserPaths } from './router.paths';

export const AuthPageLinks = {
  main: AuthPaths.ROOT_PATH,
  login: join(AuthPaths.ROOT_PATH, AuthPaths.LOGIN),
} as const;

// =============================================================================

export const ProductsPageLinks = {
  main: ProductPaths.ROOT_PATH,
  details: (id: string | number) => generatePath(ProductPaths.DETAILS, { id: id.toString() }),
} as const;


// =============================================================================

export const UsersPageLinks = {
  main: UserPaths.ROOT_PATH,
  details: (id: string | number) => generatePath(UserPaths.DETAILS, { id: id.toString() }),
} as const;

// =============================================================================

export const PostsPageLinks = {
  main: PostPaths.ROOT_PATH,
  details: (id: string | number) => generatePath(PostPaths.DETAILS, { id: id.toString() }),
} as const;

// =============================================================================

export const TodosPageLinks = {
  main: TodoPaths.ROOT_PATH,
} as const;
