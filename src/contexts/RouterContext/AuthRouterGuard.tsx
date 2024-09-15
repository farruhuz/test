import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../AuthContext/AuthContext';
import { Layout } from '../../layout/Layout';
import { AuthPageLinks } from './router.links';


export const AuthRouterGuard = () => {
  const { isAuthenticated } = useAuthState();
  const token = localStorage.getItem('bearer-token')

  if (isAuthenticated || token) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  return <Navigate to={AuthPageLinks.login} replace />;
};
