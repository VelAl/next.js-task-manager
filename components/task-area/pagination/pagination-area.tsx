import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { PaginationSelection } from './pagination-selection';

export const PaginationArea = <T,>({ table }: { table: Table<T> }) => {
  const tableState = table.getState();

  return (
    <div className='relative w-full overflow-hidden flex items-center justify-between mt-2'>
      <span className='text-slate-600 text-sm'>
        {Object.keys(tableState.rowSelection).length} of {table.getRowCount()}{' '}
        row(s) selected.
      </span>

      <div className='flex items-center gap-14'>
        <PaginationSelection table={table} />

        <div className='flex gap-6 items-center'>
          <span className='text-sm font-medium'>
            Page {tableState.pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

          <div className='flex items-center justify-end space-x-2'>
            {/*____________FIRST PAGE BTN _________________________________________*/}
            <Button
              className='size-9 w-12'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
              size='sm'
              variant='outline'
            >
              <BiFirstPage />
            </Button>

            {/*____________PREVIOUS PAGE BTN ______________________________________*/}
            <Button
              className='size-9 w-12'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size='sm'
              variant='outline'
            >
              <GrFormPrevious />
            </Button>

            {/*____________NEXT PAGE BTN __________________________________________*/}
            <Button
              className='size-9 w-12'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size='sm'
              variant='outline'
            >
              <GrFormNext />
            </Button>

            {/*____________LAST PAGE BTN __________________________________________*/}
            <Button
              className='size-9 w-12'
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              size='sm'
              variant='outline'
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
