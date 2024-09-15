import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsQueryKeys } from '../../contexts/QueryContext/query.keys';
import { ProductsApi } from '../../api/domains/products.api';

export const useProductsList = () => {
  const [searchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: Number(searchParams.get('page')) || 1,
  });

  const { pageIndex, pageSize } = pagination;

  const { data, isLoading } = useQuery({
    queryKey: ProductsQueryKeys.productsList(pageIndex, pageSize),
    queryFn: () => ProductsApi.getAllProducts(),
    placeholderData: { products: [] },
    staleTime: 0,
  });

  return { products: data?.products || [], isLoading, pagination, setPagination };
};

