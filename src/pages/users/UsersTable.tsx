import { memo } from 'react';
import { useUsersList } from './useUsersList';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';


const columns = [
  {
    accessorKey: 'id',
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
          Delete User
        </Button>
      );
    },
    header: 'Actions',
  },
];

// =================================================================

export const UsersTable = memo(() => {
  const { users, isLoading, isPlaceholderData, pagination, setPagination } = useUsersList();

  if (!users && isLoading) {
    return <h2>Loading...</h2>;
  }

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

