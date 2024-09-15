import { PageTitle } from '../../components/PageTitle/PageTitle';
import { UsersTable } from './UsersTable';

export const UsersPage = () => {
  return (
    <div>
      <PageTitle title="Posts" className="mb-8" />
      <UsersTable />
    </div>
  );
};
