import { FilterFn } from '@tanstack/react-table';

import { T_Task } from '@/app-types';

export const titleFilter: FilterFn<T_Task> = (row, _, filterValue) => {
  const title: string = row.getValue('title') || '';

  const searchQuery = String(filterValue).toLowerCase();

  return title.toLowerCase().includes(searchQuery);
};
