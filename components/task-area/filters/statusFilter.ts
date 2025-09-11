import { FilterFn } from '@tanstack/react-table';

import { T_Task } from '@/app-types';

export const statusFilter: FilterFn<T_Task> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const status: string = row.getValue(columnId);
  return filterValue.includes(status);
};
