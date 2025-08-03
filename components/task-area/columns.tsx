'use client';
import { Column, ColumnDef } from '@tanstack/react-table';

import { type T_Task } from '@/data-mocked/tasks-data';
import {
  ArrowUpCircle,
  ArrowUpDown,
  CheckCircle,
  Circle,
  HelpCircle,
  Star,
  XCircle,
} from 'lucide-react';
import { IoArrowBack, IoArrowDown, IoArrowUp } from 'react-icons/io5';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { GrHide } from 'react-icons/gr';
import { AiFillStar } from 'react-icons/ai';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

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

  const formattedDate = new Intl.DateTimeFormat(navigator.language).format(
    date
  );

  return formattedDate;
}

type T_SortableHeaderProps = {
  column: Column<T_Task, unknown>;
  label: string;
};

const sortIcns = {
  asc: IoMdArrowUp,
  desc: IoMdArrowDown,
  false: ArrowUpDown,
} as const;

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

      <DropdownMenuContent align='start' side='bottom' className='poppins'>
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
      return row.original.isFavorite ? AiFillStar : Star;
    },
  },
  //_______TITLE_________________________________________________________
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} label='Title' />,
    cell: ({ row }) => {
      const label = row.original.label;
      const title = row.original.title;

      return (
        <div className='flex items-center gap-2'>
          <Badge variant='outline'>{label}</Badge>
          <span>{title}</span>
        </div>
      );
    },
  },
  //_______STATUS________________________________________________________
  {
    accessorKey: 'status',
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusIcns;
      const Icon = statusIcns[status];

      return (
        <div className='flex items-center gap-2 text-sm'>
          {Icon && <Icon size={17} className='text-gray-500 opacity-95' />}
          <span>{status}</span>
        </div>
      );
    },
  },
  //_______PRIORITY______________________________________________________
  {
    accessorKey: 'priority',
    header: "Priority",

    cell: ({ row }) => {
      const priority = row.original.priority as keyof typeof priorityIcns;
      const Icon = priorityIcns[priority];

      return (
        <div className='flex items-center gap-2 text-sm'>
          {Icon && <Icon size={17} className='text-gray-500 opacity-95' />}
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
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  //_______ACTIONS_______________________________________________________
  { id: 'actions' },
];
