import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { AxiosError } from 'axios';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_UNAUTHORIZED } from '../../constants/http-code.constants';


// ----------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['isLoading', 'data'],
      retry: (failureCount: number, error) => {
        const { code } = error as AxiosError;
        const statusCode = parseInt(code!);

        if (statusCode === HTTP_CODE_UNAUTHORIZED || statusCode === HTTP_CODE_BAD_REQUEST) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

// ----------------------------------------------------------------

interface Props {
  children: ReactNode;
}

// ----------------------------------------------------------------

export const ReactQueryProvider = (props: Props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
