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
import { PostPaths, ProductPaths, UserPaths } from './router.paths';

//===================   LOGIN    =============================================
const { LoginPage } = lazily(() => import('../../pages/login/LoginPage'));

//====================  PRODUCTS ===================================================
const { ProductsPage } = lazily(() => import('../../pages/products/ProductsPage'));
const { ProductItem } = lazily(() => import('../../pages/products/ProductItem'));

//====== USER ======
const { UsersPage } = lazily(() => import('../../pages/users/UsersPage'));
const { User } = lazily(() => import('../../pages/users/User'));

//====== POSTS ======
const { PostsPage } = lazily(() => import('../../pages/posts/PostsPage'));
const { PostItem } = lazily(() => import('../../pages/posts/PostItem'));
const { PostEdit } = lazily(() => import('../../pages/posts/PostEdit'));

//====== TODOS ======
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
        {
          path: ProductPaths.DETAILS,
          element: <ProductItem />,
        },
        //====== USERS  ======
        {
          path: UsersPageLinks.main,
          element: <UsersPage />,
        },
        {
          path: UserPaths.DETAILS,
          element: <User />,
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
