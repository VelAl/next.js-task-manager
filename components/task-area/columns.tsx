'use client';
import { AiFillStar } from 'react-icons/ai';
import { GrHide } from 'react-icons/gr';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { Column, ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpCircle,
  CheckCircle,
  Circle,
  HelpCircle,
  Star,
  XCircle,
} from 'lucide-react';

import { T_Task } from '@/app-types';

import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { priorityFilter, statusFilter, titleFilter } from './filters';

const statusIcns = {
  'To Do': Circle,
  'In Progress': ArrowUpCircle,
  Done: CheckCircle,
  Backlog: HelpCircle,
  Canceled: XCircle,
} as const;

const priorityIcns = {
  Low: IoArrowDown,
  Medium: IoArrowBack,
  High: IoArrowUp,
};

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  return formattedDate;
}

type T_SortableHeaderProps = {
  column: Column<T_Task, unknown>;
  label: string;
};

const SortableHeader = ({ column, label }: T_SortableHeaderProps) => {
  const isSorted = column.getIsSorted(); // "asc" | "desc" | false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          aria-label={`Sort by ${label}`}
          className={`${isSorted && 'text-primary'}
            flex items-start py=[14px] select-none cursor-pointer p-2 gap-1`}
        >
          {label}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='poppins' side='bottom'>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowUp className='mr-2 h-4 w-4' />
          Asc
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowDown className='mr-2 h-4 w-4' />
          Desc
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <GrHide className='mr-2' />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const tasksColumns: ColumnDef<T_Task>[] = [
  //_______SELECT_ROW(S)_CHECKBOX________________________________________
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select task ${row.getValue('title')}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  //_______TASK_ID_______________________________________________________
  {
    header: 'Task ID',
    accessorKey: 'taskId',
  },

  //_______IS_FAVORITE_STAR______________________________________________
  {
    accessorKey: 'isFavorite',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='flex justify-center'>
          {row.original.isFavorite ? (
            <AiFillStar color='gold' size={28} />
          ) : (
            <Star />
          )}
        </div>
      );
    },
  },

  //_______TITLE_________________________________________________________
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} label='Title' />,
    filterFn: titleFilter,
    cell: ({ row }) => {
      const title = row.original.title;

      return (
        <div className='flex items-center gap-2'>
          <span>{title}</span>
        </div>
      );
    },
  },

  //_______TYPE__________________________________________________________
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as T_Task['type'];
      return (
        <div className='flex items-center gap-2'>
          <Badge
            variant={
              type === 'Bug'
                ? 'destructive'
                : type === 'Feature'
                ? 'default'
                : 'sky'
            }
          >
            {type}
          </Badge>
        </div>
      );
    },
  },

  //_______STATUS________________________________________________________
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: statusFilter,
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusIcns;
      const Icon = statusIcns[status];

      return (
        <div className='flex items-center gap-2 text-sm'>
          {Icon && <Icon className='text-gray-500 opacity-95' size={17} />}
          <span>{status}</span>
        </div>
      );
    },
  },

  //_______PRIORITY______________________________________________________
  {
    accessorKey: 'priority',
    header: 'Priority',
    filterFn: priorityFilter,

    cell: ({ row }) => {
      const priority = row.original.priority as keyof typeof priorityIcns;
      const Icon = priorityIcns[priority];

      return (
        <div className='flex items-center gap-2 text-sm'>
          {Icon && <Icon className='text-gray-500 opacity-95' size={17} />}
          <span>{priority}</span>
        </div>
      );
    },
  },

  //_______CREATED_AT____________________________________________________
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableHeader column={column} label='Created At' />
    ),
    cell: ({ row }) => (
      <span className='font-mono'>{formatDate(row.getValue('createdAt'))}</span>
    ),
  },

  //_______ACTIONS_______________________________________________________
  { id: 'actions' },
];
