import { Button } from '@/components/ui/button';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';

import { PaginationSelection } from './pagination-selection';

export const PaginationArea = () => {
  return (
    <div className='relative w-full overflow-hidden flex items-center justify-between mt-2'>
      <span className='text-slate-600 text-sm'>0 of 36 row(s) selected.</span>

      <div className='flex items-center gap-14'>
        <PaginationSelection />

        <div className='flex gap-6 items-center'>
          <span className='text-sm font-medium'>Page 1 of 4 </span>

          <div className='flex items-center justify-end space-x-2'>
            {/*____________FIRST PAGE BTN _________________________________________*/}
            <Button
              variant='outline'
              size='sm'
              className='size-9 w-12'
              // onClick={() => table.setPageIndex(0)}
              // disabled={!table.getCanPreviousPage()}
            >
              <BiFirstPage />
            </Button>

            {/*____________PREVIOUS PAGE BTN ______________________________________*/}
            <Button
              variant='outline'
              size='sm'
              className='size-9 w-12'
              // onClick={() => table.prevPage()}
              // disabled={!table.getCanPreviousPage()}
            >
              <GrFormPrevious />
            </Button>

            {/*____________NEXT PAGE BTN __________________________________________*/}
            <Button
              variant='outline'
              size='sm'
              className='size-9 w-12'
              // onClick={() => table.nextPage()}
              // disabled={!table.getCanNextPage()}
            >
              <GrFormNext />
            </Button>

            {/*____________LAST PAGE BTN __________________________________________*/}
            <Button
              variant='outline'
              size='sm'
              className='size-9 w-12'
              // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              // disabled={!table.getCanNextPage()}
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
