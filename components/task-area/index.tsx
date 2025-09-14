'use client';

import { useState } from 'react';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useTasksDataStore } from '@/hooks/useTasksStore';

import {
  PriorityDropDown,
  StatusDropDown,
  ViewColumnsDropdown,
} from '../drop-downs';
import { ResetFiltersBtn } from '../reset-filters-btn';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import { tasksColumns } from './columns';
import { priorityFilter, statusFilter, titleFilter } from './filters';
import { PaginationArea } from './pagination';
import { SearchInput } from './search-input';
import { TasksTable } from './tasks-table';

export const TasksArea = () => {
  const { tasks } = useTasksDataStore();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: tasks || [],
    columns: tasksColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,

    state: {
      columnFilters,
    },

    filterFns: {
      titleFilter,
      statusFilter,
      priorityFilter,
    },
  });

  console.log('table ===>', table.getState());

  return (
    <div className='px-4 mt-2'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <SearchInput table={table} />

              <StatusDropDown table={table} />
              <PriorityDropDown table={table} />

              <ResetFiltersBtn table={table} />
            </div>

            <ViewColumnsDropdown table={table} />
          </div>
        </CardHeader>

        <CardContent>
          <TasksTable columns={tasksColumns} table={table} />
        </CardContent>

        <CardFooter>
          <PaginationArea />
        </CardFooter>
      </Card>
    </div>
  );
};
