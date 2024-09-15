import {
  ColumnDef,
  TableOptions,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArrowLeftSVG from '../../assets/icons/arrow-left.svg';
import { Button } from '../Button/Button';

// =================================================================
type TableProps<TData> = Omit<
  TableOptions<TData>,
  'data' | 'columns' | 'getCoreRowModel' | 'debugTable' | 'debugHeaders' | 'debugColumns'
> & {
  data: TData[];
  onPaginationChange: any;
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  title?: string;
  state?: any
};

// =================================================================

export function Table<TData>(props: TableProps<TData>) {
  const {
    data = [],
    columns,
    title,
    isLoading = false,
    manualPagination = true,
    state,
    onPaginationChange,
    ...restOfProps
  } = props;

  const [_, setSearchParams] = useSearchParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // debugTable: isTest,
    // debugHeaders: isTest,
    // debugColumns: isTest,
    manualPagination,
    ...restOfProps,
  });

  const page = table.getState().pagination.pageIndex;

  useEffect(() => {
    setSearchParams(searchParams => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
    console.log(table.getState().pagination.pageIndex);

    onPaginationChange((prevPagination: any) => {
      console.log(prevPagination, state.pagination.skip);
      return {
        ...prevPagination,
        pageIndex: state.pagination.pageIndex,
        skip: 15
      }
    })
  }, [page]);


  return (
    <div className="rounded-md border border-gray">
      {/* pagination section */}
      <div className="flex items-center justify-between border-b p-4">
        <div>search input by id</div>
        <div className="ml-auto flex items-center justify-end gap-2">
          {isLoading && <span>Loading...</span>}
          <div className="join border border-gray">
            <Button
              variant="neutral"
              onClick={table.previousPage}
              disabled={table.getState().pagination.pageIndex < 2 || isLoading}
              className="border-1 join-item"
            >
              <img src={ArrowLeftSVG} alt="" />
            </Button>
            <Button className="join-item pointer-events-none border-b-0 border-t-0 border-gray">
              Page {page} of {Math.trunc(table.getPageCount() / 15)}
            </Button>
            <Button
              variant="neutral"
              onClick={table.nextPage}
              disabled={!table.getCanNextPage() || isLoading}
              className="join-item"
            >
              <img src={ArrowLeftSVG} alt="" />
            </Button>
          </div>
        </div>
      </div>
      {
        data.length !== 0 && (
          <div className="w-full overflow-x-auto">
            <table className="table table-md w-full whitespace-nowrap">
              <thead className="bg-gray">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-gray">
                    {headerGroup.headers.map(header => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="py-4 text-lg font-medium"
                        >
                          {header.isPlaceholder ? null : (
                            <>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => {
                  return (
                    <tr key={row.id} className="hover border-gray">
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td key={cell.id} className="py-4" >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }
    </div >
  );
}
