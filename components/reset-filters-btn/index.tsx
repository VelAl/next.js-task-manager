'use client';

import { IoCloseSharp } from 'react-icons/io5';

import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';

export const ResetFiltersBtn = <T,>({ table }: { table: Table<T> }) => {
  const { setColumnFilters, getState } = table;

  if (!getState().columnFilters.length) return null;

  return (
    <Button
      className='h-10 bg-red-100'
      onClick={() => setColumnFilters([])}
      variant={'ghost'}
    >
      <span>Reset</span>
      <IoCloseSharp color='red' />
    </Button>
  );
};
