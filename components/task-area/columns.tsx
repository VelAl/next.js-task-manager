'use client';
import { ColumnDef } from '@tanstack/react-table';

import { type T_Task } from '@/data-mocked/tasks-data';
import {
  ArrowUpCircle,
  CheckCircle,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { IoArrowBack, IoArrowDown, IoArrowUp } from 'react-icons/io5';

const statusIcns = {
  'To Do': Circle,
  'In Progress': ArrowUpCircle,
  Done: CheckCircle,
  Backlog: HelpCircle,
  Cancelled: XCircle,
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

export const tasksColumns: ColumnDef<T_Task>[] = [];
