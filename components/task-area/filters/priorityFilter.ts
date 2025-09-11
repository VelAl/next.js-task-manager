import { FilterFn } from "@tanstack/react-table";

import { T_Task } from "@/app-types";


export const priorityFilter: FilterFn<T_Task> = (
  row,
  columnId,
  filterValue: string
) => {
  const priority: string = row.getValue(columnId);
  return filterValue.includes(priority);
};
