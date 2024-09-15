
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ProductsTable } from './ProductsTable';

export const ProductsPage = () => {
  return (
    <div>
      <PageTitle title="Products" />
      <ProductsTable />
    </div>
  );
};
