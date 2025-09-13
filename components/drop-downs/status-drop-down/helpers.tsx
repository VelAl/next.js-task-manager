import { IconType } from 'react-icons/lib';

import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';

import { E_TaskStatus } from '@/app-types';

type T_StatusOption = {
  value: E_TaskStatus;
  label: string;
  icon: IconType;
};

export const options: T_StatusOption[] = [
  { value: E_TaskStatus.Backlog, label: 'Backlog', icon: HelpCircle },
  { value: E_TaskStatus.ToDo, label: 'To Do', icon: Circle },
  { value: E_TaskStatus.InProgress, label: 'In Progress', icon: ArrowUpCircle },
  { value: E_TaskStatus.Done, label: 'Done', icon: CheckCircle2 },
  { value: E_TaskStatus.Canceled, label: 'Canceled', icon: XCircle },
] as const;
