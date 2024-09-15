import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSet } from 'react-use';
import { User } from '../../api/types/auth.types';
import { removeRequestHeaderToken, setRequestHeaderToken } from './auth.interceptors';
import { httpClient } from '../../services/http-client/http-client';
import { AuthApi } from '../../api/domains/auth.api';
import { AuthPageLinks, ProductsPageLinks } from '../RouterContext/router.links';


// =================================================================

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  userCredentials: User;
  isAuthenticated: boolean;
}

interface AuthMethods {
  persistAccessToken: (token: string) => void;
  setUserCredentials: (user: User) => void;
  removeAccessToken: VoidFunction;
  fetchUserCredentials: VoidFunction;
  logout: VoidFunction;
  initialize: VoidFunction;
}

// =================================================================

const AuthMethodsContext = createContext<AuthMethods | null>(null);

const AuthStateContext = createContext<AuthState | null>(null);

// =================================================================

const getInitialState = () => ({
  accessToken: '',
  userCredentials: {} as User,
  isAuthenticated: false,
});

const ACCESS_TOKEN = 'bearer-token' as const;

// =================================================================

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const navigate = useNavigate();

  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);
  const [getAuthState, setAuthState] = useGetSet<AuthState>(getInitialState);
  const methodsRef = useRef<AuthMethods>();

  if (!methodsRef.current) {
    const persistAccessToken = (token: string) => {
      try {
        localStorage.setItem(ACCESS_TOKEN, token);
        setAuthState(prev => ({
          ...prev,
          accessToken: token,
          isAuthenticated: true,
        }));
        setRequestHeaderToken(httpClient, token);
      } catch (error) {
        throw error;
      }
    };

    // =================================================================

    const setUserCredentials = (user: User) => {
      setAuthState(prev => ({ ...prev, userCredentials: user }));
    };

    // =================================================================

    const removeAccessToken = () => {
      localStorage.removeItem(ACCESS_TOKEN);
      removeRequestHeaderToken(httpClient);
      setAuthState(prev => ({
        ...prev,
        accessToken: '',
        isAuthenticated: false,
      }));
    };

    // =================================================================

    const fetchUserCredentials = async () => {
      try {
        const user = await AuthApi.getMe();
        setUserCredentials(user);
        setAuthState(prev => ({ ...prev, isAuthenticated: true }));
        navigate(ProductsPageLinks.main, { replace: true });
      } catch (error: any) {
        if (!error.response) {
          throw error;
        }

        removeAccessToken();
        navigate(AuthPageLinks.login, { replace: true });
      }
    };

    // =================================================================

    const logout = async () => {
      try {
        removeAccessToken();
      } catch (error) {
        throw error;
      }
    };

    // =================================================================

    const initialize = async () => {
      setIsInitialCheckDone(true);
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        persistAccessToken(accessToken);
        await fetchUserCredentials();
      }
    };

    // =================================================================

    methodsRef.current = {
      persistAccessToken,
      setUserCredentials,
      removeAccessToken,
      fetchUserCredentials,
      initialize,
      logout,
    };
  }

  useEffect(() => {
    methodsRef.current?.initialize();
  }, [])

  if (!isInitialCheckDone) {
    return null;
  }

  return (
    <AuthStateContext.Provider value={getAuthState()}>
      <AuthMethodsContext.Provider value={methodsRef.current}>
        {children}
      </AuthMethodsContext.Provider>
    </AuthStateContext.Provider>
  );
};

// =================================================================

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState should be used within AuthProvider');
  }

  return context;
};

// =================================================================

export const useAuthMethods = () => {
  const context = useContext(AuthMethodsContext);
  if (!context) {
    throw new Error('useAuthMethods should be used within AuthProvider');
  }

  return context;
};
