'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '../ui/input';

export const SearchInput = <T,>({ table }: { table: Table<T> }) => {
  const { setColumnFilters, getState } = table;
  const searchStr =
    (getState().columnFilters.find((f) => f.id === 'title')?.value as string) ||
    '';

  const onSearchChange = (value: string) => {
    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== 'title');
      if (value) {
        return [...otherFilters, { id: 'title', value }];
      }
      return otherFilters;
    });
  };

  return (
    <Input
      className='h-10'
      onChange={({ target: { value } }) => onSearchChange(value)}
      placeholder='Search tasks...'
      type='text'
      value={searchStr}
    />
  );
};
