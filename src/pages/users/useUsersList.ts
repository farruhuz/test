import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UsersQueryKeys } from '../../contexts/QueryContext/query.keys';
import { UsersApi } from '../../api/domains/users.api';

export const useUsersList = () => {
  const [searchParams] = useSearchParams();

  const [{ pageIndex, pageSize, skip }, setPagination] = useState<{
    pageSize: number;
    pageIndex: number;
    skip?: number;
  }>({
    pageSize: 15,
    pageIndex: Number(searchParams.get('page')) || 1,
    skip: 0
  });

  const pagination = useMemo(() => ({ pageSize, pageIndex, skip }), [pageIndex, pageSize, skip]);

  const {
    data: users,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: UsersQueryKeys.usersList(pageIndex, pageSize),
    queryFn: () => UsersApi.getUsers({ page: pageIndex, limit: pageSize }),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return { users, isLoading, isPlaceholderData, pagination, setPagination };
};
