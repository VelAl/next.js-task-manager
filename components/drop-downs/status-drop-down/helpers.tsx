import { IconType } from 'react-icons/lib';

import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';

import { T_TaskStatus } from "@/app-types";

type T_StatusOption = {
  value: T_TaskStatus;
  label: string;
  icon: IconType;
};

export const options: T_StatusOption[] = [
  { value: 'Backlog', label: 'Backlog', icon: HelpCircle },
  { value: 'To Do', label: 'To Do', icon: Circle },
  { value: 'In Progress', label: 'In Progress', icon: ArrowUpCircle },
  { value: 'Done', label: 'Done', icon: CheckCircle2 },
  { value: 'Canceled', label: 'Canceled', icon: XCircle },
] as const;
