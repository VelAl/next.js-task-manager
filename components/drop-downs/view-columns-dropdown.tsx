'use client';

import { BiColumns } from 'react-icons/bi';

import { Table } from '@tanstack/react-table';

import { T_Task } from '@/app-types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { hidableColumnsIdsToTitles } from '../task-area/columns';

export const ViewColumnsDropdown = ({ table }: { table: Table<T_Task> }) => {
  const columnsWithHiding = table
    .getAllColumns()
    .filter((column) => column.getCanHide());

  const handleVisibilityChange = (columnId: string, visibility: boolean) => {
    table.setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visibility,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-11 px-8 popppins' variant='outline'>
          <BiColumns />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' >
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {columnsWithHiding.map((column) => (
          <DropdownMenuCheckboxItem
            checked={column.getIsVisible()}
            key={column.id}
            onCheckedChange={(checked) =>
              handleVisibilityChange(column.id, checked)
            }
          >
            {hidableColumnsIdsToTitles[column.id] || column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
