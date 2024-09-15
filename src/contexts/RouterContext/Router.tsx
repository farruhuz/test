import { lazily } from 'react-lazily';
import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthRouterGuard } from './AuthRouterGuard';
import {
  AuthPageLinks,
  PostsPageLinks,
  ProductsPageLinks,
  TodosPageLinks,
  UsersPageLinks
} from './router.links';
import { PostPaths } from './router.paths';


const { LoginPage } = lazily(() => import('../../pages/login/LoginPage'));
const { ProductsPage } = lazily(() => import('../../pages/products/ProductsPage'));
const { UsersPage } = lazily(() => import('../../pages/users/UsersPage'));
const { PostsPage } = lazily(() => import('../../pages/posts/PostsPage'));
const { PostItem } = lazily(() => import('../../pages/posts/PostItem'));
const { PostEdit } = lazily(() => import('../../pages/posts/PostEdit'));
const { TodosPage } = lazily(() => import('../../pages/todos/TodosPage'));


export const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <AuthRouterGuard />,
      children: [
        {
          index: true,
          element: <Navigate to={ProductsPageLinks.main} replace />,
        },
        //====== PRODUCTS ======
        {
          path: ProductsPageLinks.main,
          element: <ProductsPage />,
        },
        //====== USERS  ======
        {
          path: UsersPageLinks.main,
          element: <UsersPage />,
        },
        //====== POSTS ======
        {
          path: PostsPageLinks.main,
          element: <PostsPage />,
        },
        {
          path: PostPaths.DETAILS,
          element: <PostItem />,
        },
        {
          path: PostPaths.EDIT,
          element: <PostEdit />,
        },
        //====== TODOS ======
        {
          path: TodosPageLinks.main,
          element: <TodosPage />,
        },
      ],
    },

    // Login Page
    {
      path: AuthPageLinks.login,
      element: <LoginPage />,
    },

    // Not found page
    {
      path: '/404',
      element: <h1>Not found!</h1>,
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
