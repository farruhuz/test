import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useUsersList } from './useUsersList';
import { PostsPageLinks } from '../../contexts/RouterContext/router.links';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';


const columns = [
  {
    accessorKey: 'id',
    cell: (props: any) => {
      const id = props.getValue() as number;
      return (
        <Link
          to={PostsPageLinks.details(id)}
          className="border-b border-white transition-all duration-300 hover:border-primary hover:text-primary"
        >
          {id}
        </Link>
      );
    },
    header: '№ Number',
  },
  {
    accessorKey: 'firstName',
    header: 'FirstName',
  },
  {
    accessorKey: 'lastName',
    header: 'LastName',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date',
  },
  {
    accessorKey: 'ip',
    header: 'IP Address',
  },

  {
    accessorFn: (row: any) => {
      return row.id;
    },
    cell: (props: any) => {
      const id = props.getValue() as number;

      return (
        <Button variant="primary" onClick={() => console.log({ id })} className="text-base">
          Закрыть заказ
        </Button>
      );
    },
    header: 'Действие',
  },
];

// =================================================================

export const UsersTable = memo(() => {
  const { users, isLoading, isPlaceholderData, pagination, setPagination } = useUsersList();

  if (!users && isLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(users);

  return (
    <Table
      columns={columns}
      pageCount={users!.total}
      state={{ pagination }}
      data={users!.users}
      isLoading={isLoading || isPlaceholderData}
      onPaginationChange={setPagination}
    />
  );
});

