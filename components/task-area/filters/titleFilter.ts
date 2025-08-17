import { FilterFn } from '@tanstack/react-table';

import { T_Task } from '@/app-types';

export const titleFilter: FilterFn<T_Task> = (row, _, filterValue) => {
  const title = ((row.getValue('title') as string) || '').toLowerCase();

  const searchQuery = String(filterValue).toLowerCase();

  return title.includes(searchQuery);
};
