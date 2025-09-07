import { useMemo } from 'react';

import { T_Priority, T_Task, T_TaskStatus } from '@/app-types';
import { tasks } from '@/data-mocked/tasks-data';

const getTasksCounts = (tasks: T_Task[]) =>
  tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    acc[task.status] = (acc[task.status] || 0) + 1;

    return acc;
  }, {} as { [key in T_Priority | T_TaskStatus]: number });

export const useTasksCounts = () => {
  return useMemo(() => getTasksCounts(tasks), [tasks]);
};
