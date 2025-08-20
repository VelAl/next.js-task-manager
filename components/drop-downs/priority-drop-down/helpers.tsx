import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { T_Priority, T_Task } from '@/app-types';

export type T_PriorityOption = {
  value: T_Priority;
  label: string;
  icon: IconType;
  count: number;
};

export const options: T_PriorityOption[] = [
  { value: 'Low', label: 'Low', icon: IoArrowDown, count: 0 },
  { value: 'Medium', label: 'Medium', icon: IoArrowBack, count: 0 },
  { value: 'High', label: 'High', icon: IoMdArrowUp, count: 0 },
];

export const getOptionsWithCounts = (tasks: T_Task[]): T_PriorityOption[] => {
  const counts = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as { [key in T_Priority]: number });

  return options.map((opt) => ({
    ...opt,
    count: counts[opt.value] || 0,
  }));
};
